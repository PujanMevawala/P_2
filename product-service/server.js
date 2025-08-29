const express = require('express');
const app = express();
const PORT = 5001;

app.use(express.json());

let products = [];
let currentId = 1;

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).send({ message: 'Name and price are required.' });
    }
    const newProduct = { id: currentId++, name, price };
    products.push(newProduct);
    console.log('Created Product:', newProduct);
    res.status(201).send(newProduct);
});

app.get('/products', (req, res) => {
    console.log('Returning all products');
    res.status(200).send(products);
});

app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).send({ message: 'Product not found.' });
    }

    if (name) products[productIndex].name = name;
    if (price) products[productIndex].price = price;

    console.log('Updated Product:', products[productIndex]);
    res.status(200).send(products[productIndex]);
});


app.listen(PORT, () => {
    console.log(`Product-Service running on http://localhost:${PORT}`);
});