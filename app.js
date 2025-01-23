const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const items = [];
const workItems = [];

app.get('/', (req, res) => {
    const day = date();
    res.render('list', { listTitle: day, listItems: items });
});

app.post('/', (req, res) => {
    const item = req.body.newItem;

    if (item.trim() !== '') {
        if (req.body.btnFromList === 'Work') {
            workItems.push(item);
            res.redirect('/work');
        } else {
            items.push(item);
            res.redirect('/');
        }
    }
});

app.get('/work', (req, res) => {
    res.render('list', { listTitle: 'Work', listItems: workItems });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
