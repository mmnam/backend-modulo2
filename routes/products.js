const router = require('express').Router();
const { addProduct } = require('../controllers/products');
const auth = require('../config/auth')



router.post('/addProduct',auth.required, addProduct);


module.exports = router;