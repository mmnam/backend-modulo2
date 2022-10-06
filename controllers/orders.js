const Product = require('../models/orders');

function createOrder(req, res) {
    const body = req.body;
    Product.create(body).then(order => {
        res.status(201).json(order);
    });
}


module.exports = { createOrder }