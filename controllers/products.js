const Product = require('../models/products');

function addProduct(req, res) {
    const body = req.body;
    Product.create(body).then(product => {
        res.status(201).json(product);
    });
}
async function getProduct(req, res) {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    res.status(200).json(product);
}
async function getProducts(req,res){
    console.log(req.auth)
    const products = await Product.findAll()
    res.status(200).json(products)    
}

async function deleteProduct(req, res) {
    const id = req.params.id;
    const deleted = Product.destroy(
        {where: {id} }
    );
    res.status(200).json(deleted);
}

async function updateProduct(req, res) {
    const id = req.params.id;
    const product = req.body;
    await Product.update(product, {where: {id}});
    const product_updated = await Product.findByPk(id);
    res.status(200).json(product_updated);
}


module.exports = { addProduct ,getProducts,getProduct, deleteProduct,updateProduct}