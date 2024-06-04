const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
];

app.get('https://664cba55ede9a2b5565160ad.mockapi.io/Cliente', (req, res) => {
    res.json(items);
});

app.get('https://664cba55ede9a2b5565160ad.mockapi.io/Cliente', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    res.json(item);
});

app.post('https://664cba55ede9a2b5565160ad.mockapi.io/Cliente', (req, res) => {
    const newItem = { id: items.length + 1, name: req.body.name };
    items.push(newItem);
    res.json(newItem);
});

app.put('https://664cba55ede9a2b5565160ad.mockapi.io/Cliente', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    item.name = req.body.name;
    res.json(item);
});

app.delete('https://664cba55ede9a2b5565160ad.mockapi.io/Cliente', (req, res) => {
    items = items.filter(i => i.id != req.params.id);
    res.json({ message: 'Item deleted' });
});

app.listen(3000, () => {
    console.log('Server running on https://664cba55ede9a2b5565160ad.mockapi.io/Cliente');
});
