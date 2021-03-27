const userOrders = require('../../../models/user_orders');
const User = require('../../../models/users');
const Cart = require('../../../models/cart');
const mongoose = require('mongoose');
const Orders = require('../../../models/user_orders');
const newOrderMailer = require('../../../mailers/new_order_mailer');

module.exports.getAllUserOrder = async function(req, res){
    try{
        const filterItem = {
            '_id': true,
            'products': true,
            'orderId' : true,
            'total' : true
        }
        const user = await User.findById(req.user.id).populate('orders',filterItem);
        return res.status(200).json({
            data: user.orders
        })
    }
    catch(error){
        console.log('Error in fetching order',error);
        return res.status(500).json({
        message: `Error in fetching order ${error.message}`
        });
    }
}
module.exports.getOrderDeatils = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false,
            'user' : false
        }
        const filterItem2 = {
            'updatedAt': false,
            'user' : false
        }
        const order = await Orders.findById(req.body.id,filterItem2).populate('address',filterItem);
        return res.status(200).json({
            data: order
        })
    }
    catch(error){
        console.log('Error in fetching order details',error);
        return res.status(500).json({
        message: `Error in fetching order details ${error.message}`
        });
    }
}
module.exports.createOrder = async function(req, res){
    try{
        const cart = await Cart.findOne({user:req.user.id}).populate('products');
        const user = await User.findById(req.user.id)
        if(cart){
            let totalPrice = 0;
        cart.products.forEach(element => {
            totalPrice=totalPrice+element.price*element.quantity;
        });
        let orderId = Date.now();
        orderId='ODR'+Math.floor( orderId / 1000 );
        
        const newOrder = await Orders.create({
            user: req.user.id,
            products: cart.products,
            address: mongoose.Types.ObjectId(req.body.address),
            total: totalPrice,
            paymentMethod: 'Cash on Delivery',
            orderId: orderId
        });
        const filterItem = {
            'createdAt': false,
            'updatedAt': false
        }
        const filterItem2 = {
            'phone': true,
            'name' : true
        }
        const orderDetails = await newOrder.populate('address',filterItem).populate('user',filterItem2).execPopulate();
        newOrderMailer.newOrder(orderDetails)
        user.orders.push(newOrder);
        user.cart = undefined;
        user.save();
        cart.remove();

        }
        else{
            return res.status(409).json({
                message: 'Add products in cart to place order'
            })
        }
        return res.status(200).json({
            message: 'Order placed Sucessfully'
        })
    }
    catch(error){
        console.log('Error in placing order',error);
        return res.status(500).json({
        message: `Error in placing order ${error.message}`
        });
    }
}