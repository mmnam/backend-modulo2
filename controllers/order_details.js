const Order_details = require('../models/order_details');
const User = require('./users')
const Order = require('./orders')


function createOrderDet(req, res) {
    const body = req.body;
    
    const today = new Date()
    const exp = new Date(today)
    req.body.date = exp
    Order_details.create(body).then(order => {
        res.status(201).json(order);
    });
}
async function updateOrderDet(req, res) {
    const id = req.params.id;
    const order = req.body;
    await Order_details.update(order, {where: {id}});
    const order_updated = await Order_details.findByPk(id);
    res.status(200).json(order_updated);
}






module.exports = { createOrderDet,updateOrderDet }