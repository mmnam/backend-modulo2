const router = require('express').Router();
const { createOrder,updateOrder } = require('../controllers/orders');
const auth = require('../config/auth')



router.post('/createOrder', createOrder);
router.patch('/:id',updateOrder)

module.exports = router; 