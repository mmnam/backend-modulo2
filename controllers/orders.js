const Order = require('../models/orders');
const { Sequelize, where } = require('sequelize');
const Op = Sequelize.Op
const Order_details = require('../models/order_details');
const Products = require('../models/products');
const User = require('../models/users');


async function createOrder(req, res) {
    const body = req.body;
    const today = new Date()
    const exp = new Date(today)
    req.body.date = exp
    const order = await Order.create(body)
    const Op = Sequelize.Op
    const items = body.itemsId
    const products =[{}]
    let montoTotal = 0
    const user = await User.findOne({where:{usuario:req.body.usuario}})
    for(const id in items){
    if(isNaN(items[id])){
            res.status(400).json({
                warning:"itemsId must be a number"
        
            });
            return null

        }}

    for(const id in items){
        
        
        let productFromQuery = await Products.findOne({where:{id:items[id]}})
        try{
            if(productFromQuery.dataValues.stock==0){
            res.status(200).json({
                warning:"Not enough inventory to fullfill order"
        
            });
            return null
            
            
        }
        }
        catch(err){
            if(!productFromQuery){
                return res.status(400).json({
                    error: "ProductId not found"
                })
                
            }
            
        }
        
        let newstock = productFromQuery.dataValues.stock-=1
       
        let idProduct = productFromQuery.dataValues.id
        let price = productFromQuery.dataValues.precio
        montoTotal +=price 
        let orderId =order.dataValues.id
        await Products.update({stock:newstock}, {where: {id:idProduct}});
        Order_details.create({
            precioUnitario:price,
            cantidad:1,
            ProductId:idProduct,
            OrderId:orderId
        })


    }
    await Order.update({montoTotal:montoTotal,UserId:user.id}, 
        {where: {id:order.dataValues.id}});
    res.status(200).json(order)
    //console.log(products)
    /*const product = await Product.findOne({
        where:{
            id:{ [Op.like]:`%${name}%`}
        }
    });*/
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