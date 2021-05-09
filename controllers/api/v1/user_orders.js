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
            'total' : true,
            'status': true
        }
        const user = await User.findById(req.user.id).populate('orders',filterItem);
        console.log(req.user.id);
        return res.status(200).json({
            data: user.orders
        })
    }
    catch(error){
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
        const order = await Orders.find({user:req.user.id}).where('_id').equals(req.body.id).populate('address',filterItem);
        return res.status(200).json({
            data: order[0]
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in fetching order details ${error.message}`
        });
    }
}
module.exports.getOrderDeatilsAdmin = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false,
            "isSupremeLeader": false,
            "addresses": false,
            "orders": false,
            "referred": false,
            "cart": false,
            "referralCode": false
        }
        const order = await Orders.findOne({orderId:req.body.order_id}).populate('address user',filterItem);
        return res.status(200).json({
            data: order
        })
    }
    catch(error){
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
        let orderId = Date.now();
        orderId='ODR'+Math.floor( orderId / 1000 );
        
        const newOrder = await Orders.create({
            user: req.user.id,
            products: cart.products,
            address: mongoose.Types.ObjectId(req.body.address),
            total: cart.total,
            paymentMethod: 'Cash on Delivery',
            orderId: orderId,
            status: "Placed"
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
        return res.status(500).json({
        message: `Error in placing order ${error.message}`
        });
    }
}
module.exports.getOrderStatus = async function(req, res){
    try{
        const filterItem = {
            'status': true,
            '_id': false
        }
        const order = await Orders.findById(req.body.id,filterItem);
        return res.status(200).json({
            data: order
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in fetching order status ${error.message}`
        });
    }
}
module.exports.updateOrderStatus = async function(req, res){
    try{
        const order = await Orders.findByIdAndUpdate(req.body.id,{status:req.body.status});
        order.save();
        return res.status(200).json({
            message: 'Order Status updated Sucessfully'
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in updating order status ${error.message}`
        });
    }
}