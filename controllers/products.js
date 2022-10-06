const Product = require('../models/products');

function addProduct(req, res) {
    const body = req.body;
    Product.create(body).then(product => {
        res.status(201).json(product);
    });
}
async function getProducts(req,res){
    console.log(req.auth)
    const products = await Product.findAll()
    res.status(200).json(products)    
}


module.exports = { addProduct ,getProducts}