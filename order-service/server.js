const express = require('express');
const app = express();
const PORT = 5002;

app.use(express.json());

let orders = [];
let currentId = 1;

app.post('/orders', (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).send({ message: 'Product ID and quantity are required.' });
    }
    const newOrder = { id: currentId++, productId, quantity, status: 'created' };
    orders.push(newOrder);
    console.log('Created Order:', newOrder);
    res.status(201).send(newOrder);
});

app.get('/orders', (req, res) => {
    console.log('Returning all orders');
    res.status(200).send(orders);
});

app.patch('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const orderIndex = orders.findIndex(o => o.id === orderId);

    if (orderIndex === -1) {
        return res.status(404).send({ message: 'Order not found.' });
    }

    const order = orders[orderIndex];

    // Apply partial updates from the request body
    if (req.body.quantity) {
        order.quantity = req.body.quantity;
    }
    if (req.body.status) {
        order.status = req.body.status;
    }

    console.log('Updated Order (PATCH):', order);
    res.status(200).send(order);
});

app.listen(PORT, () => {
    console.log(`Order-Service running on ${PORT}`);
});