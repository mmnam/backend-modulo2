const router = require('express').Router();
const { addProduct,getProducts ,deleteProduct,updateProduct,getProduct} = require('../controllers/products');
const auth = require('../config/auth')



router.post('/addProduct',auth.isSeller, addProduct);
router.get('/getProducts',getProducts)
router.patch('/:id', auth.isSeller,updateProduct);
router.delete('/:id',auth.isSeller,deleteProduct)
router.get('/:id',getProduct)

module.exports = router; 