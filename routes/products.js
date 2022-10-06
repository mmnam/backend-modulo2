const router = require('express').Router();
const { addProduct } = require('../controllers/products');

router.post('/addProduct', addProduct);


module.exports = router;