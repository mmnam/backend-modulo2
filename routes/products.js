const router = require('express').Router();
const { addProduct } = require('../controllers/products');

router.post('/products', addProduct);


module.exports = router;