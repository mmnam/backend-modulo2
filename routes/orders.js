const router = require('express').Router();
const { createOrder,updateOrder } = require('../controllers/orders');
const auth = require('../config/auth');
const { isSeller } = require('../config/auth');



router.post('/createOrder', auth.isBuyer,createOrder);
router.patch('/:id',isSeller,updateOrder)

module.exports = router; 