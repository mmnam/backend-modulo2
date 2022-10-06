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

async function getOrder(req, res) {
    const id = req.params.id;
    const order = await Order.findByPk(id);
    res.status(200).json(order);
}

async function getOrders(req, res) {
    const order = await Order.findAll();
    res.status(200).json(order);    
}

async function deleteOrder(req, res) {
    const id = req.params.id;
    const deleted = Order.destroy(
        {where: {id} }
    );
    res.status(200).json(deleted);
}

async function updateOrder(req, res) {
    const id = req.params.id;
    const order = req.body;
    await Order.update(order, {where: {id}});
    const order_updated = await Order.findByPk(id);
    res.status(200).json(order_updated);
}
module.exports = { createOrder,updateOrder,deleteOrder,getOrders,getOrder }