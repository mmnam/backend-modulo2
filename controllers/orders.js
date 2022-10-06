const Order = require('../models/orders');


function createOrder(req, res) {
    const body = req.body;
    
    const today = new Date()
    const exp = new Date(today)
    req.body.date = exp
    Order.create(body).then(order => {
        res.status(201).json(order);
    });
}

async function updateOrder(req, res) {
    const id = req.params.id;
    const order = req.body;
    await Order.update(order, {where: {id}});
    const order_updated = await Order.findByPk(id);
    res.status(200).json(order_updated);
}
module.exports = { createOrder,updateOrder }