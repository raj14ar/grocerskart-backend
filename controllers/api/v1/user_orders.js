const userOrders = require('../../../models/user_orders');
const User = require('../../../models/users');
const Cart = require('../../../models/cart');
const mongoose = require('mongoose');

module.exports.getAllUserOrder = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false
        }
        const user = await User.findById(req.user.id,filterItem).populate('orders');
        return res.status(200).json({
            data: user.orders
        })
    }
    catch(error){
        console.log('Error in fetching orders',error);
        return res.status(500).json({
        message: 'Error in fetching orders'
        });
    }
}

module.exports.createOrder = async function(req, res){
    try{
        const user = await User.findById(req.user.id);
        const cart = await Cart.find({_id:user.cart}).populate('products');
        if(cart){
            console.log(cart);
            // user.cart=undefined;
            // user.save();
            // cart.remove();
            
        }
        return res.status(200).json({
            message: 'Product Sucessfully added to cart'
        })
    }
    catch(error){
        console.log('Error in adding to cart',error);
        return res.status(500).json({
        message: 'Error in adding to cart'
        });
    }
}