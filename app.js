const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/todolistDB");

//create schema
const itemSchema = new mongoose.Schema({
  name: String,
});

//create model
const Item = mongoose.model("Item", itemSchema);

//create default items
const item1 = new Item({ name: "Welcome to your todo list!" });
const item2 = new Item({ name: "Hit the + button to add a new item." });
const item3 = new Item({ name: "<-- Hit this to mark an item as done." });

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});

const List = mongoose.model("List", listSchema);

app.get("/", (req, res) => {
  const day = date();
  const items = Item.find({});

  items
    .then((foundItems) => {
      if (foundItems.length === 0) {
        //create a new collection by inserting the default items in the database
        Item.insertMany(defaultItems)
          .then(() => {
            console.log("Items successfully added to the database.");
          })
          .catch((err) => {
            console.error("Error adding items:", err);
          });
      } else {
        res.render("list", {
          listTitle: "Today",
          listItems: foundItems,
          currentDate: day,
        });
      }
    })
    .catch((err) => {
      console.error("Error finding items:", err);
    });
});

app.get("/about", (req, res) => {
    res.render("about");
  });

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
  const day = date();
  if (customListName !== "Today" && customListName !== "About") {
    List.findOne({ name: customListName })
      .then((foundList) => {
        if (!foundList) {
          // Create a new list if it doesn't exist

          const list = new List({
            name: customListName,
            items: defaultItems,
          });

          list.save();
          res.redirect("/" + customListName);
        } else {
          // Render the existing list
          res.render("list", {
            listTitle: foundList.name,
            listItems: foundList.items,
            currentDate: day,
          });
        }
      })
      .catch((err) => {
        console.error("Error finding list:", err);
      });
  }
});

app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.btnFromList;

  const item = new Item({
    name: itemName,
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName })
      .then((foundList) => {
        if (foundList) {
          foundList.items.push(item);
          foundList.save();
          res.redirect("/" + listName);
        }
      })
      .catch((err) => {
        console.error("Error finding list:", err);
      });
  }
});

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    // Delete the item from the default list
    Item.findByIdAndDelete(checkedItemId)
      .then(() => {
        console.log("Successfully deleted the checked item.");
        res.redirect("/");
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  } else {
    const filter = { name: listName };
    const update = { $pull: { items: { _id: checkedItemId } } };

    List.findOneAndUpdate(filter, update)
      .then(() => {
        res.redirect("/" + listName);
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
// https://github.com/talhahossa1n/todo-list.git
