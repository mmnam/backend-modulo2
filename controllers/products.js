const Product = require('../models/products');

function addProduct(req, res) {
    const body = req.body;
    Product.create(body).then(product => {
        res.status(201).json(product);
    });
}


module.exports = { addProduct }