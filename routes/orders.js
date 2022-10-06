const router = require('express').Router();
const { createOrder,updateOrder,deleteOrder,getOrders,getOrder } = require('../controllers/orders');
const auth = require('../config/auth');
const { isSeller } = require('../config/auth');



router.post('/createOrder', auth.isBuyer,createOrder);
router.patch('/:id', auth.isSeller,updateOrder);
router.delete('/:id',auth.isBuyer,deleteOrder)
router.get('/',auth.required,getOrders)
router.get('/:id',auth.required,getOrder)

module.exports = router; 