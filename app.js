const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let items = [];

app.get('/', (req, res) => {

    const today = new Date();
    let day = '';

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };

    day = today.toLocaleDateString('en-US', options);

    res.render('list', {day, items});
});

app.post('/', (req, res) => {
    let item = req.body.newItem;

    if (item.trim() !== '') {
        items.push(item);
    }
    
    res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
