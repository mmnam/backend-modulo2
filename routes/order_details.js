const router = require('express').Router();
const { createOrderDet, updateOrderDet } = require('../controllers/order_details');
const auth = require('../config/auth')



router.post('/buy', auth.isBuyer,createOrderDet);
router.patch('/:id',auth.isSeller,updateOrderDet)

module.exports = router; 