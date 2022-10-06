const router = require('express').Router();
const users = require('./users');
const products = require('./products')
//const orderDetails = require('./order_details');
const reviews = require('./reviews');
const orders = require('./orders')

router.get('/', (req, res) => {
    res.json({'info': 'Welcome to gods API!'})
});

router.use('/users', users);
router.use('/products', products);
router.use('/orders', orders);
router.use('/reviews', reviews);
//router.use('/orderDetails', orderDetails);

module.exports = router;
