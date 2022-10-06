const router = require('express').Router();
const { addProduct,getProducts } = require('../controllers/products');
const auth = require('../config/auth')



router.post('/addProduct',auth.isSeller, addProduct);
router.get('/getProducts',getProducts)

module.exports = router; 