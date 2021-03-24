const userOrders = require('../../../models/user_orders');
const User = require('../../../models/users');
const Cart = require('../../../models/cart');
const mongoose = require('mongoose');
const Order = require('../../../models/user_orders');
const Orders = require('../../../models/user_orders');

module.exports.getAllUserOrder = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false
        }
        const user = await User.findById(req.user.id,filterItem).populate('orders');
        console.log(user.orders)
        // const order = await Order.find({user: req.user.id},filterItem).populate('products._id');
        // if(cart){
        //     cart.products.forEach(element =>  {
        //         element.price= element._id.price;
        //         element._id=element._id._id
        //     });
        // }
        return res.status(200).json({
            data: user.orders
        })
    }
    catch(error){
        console.log('Error in fetching cart',error);
        return res.status(500).json({
        message: 'Error in fetching cart'
        });
    }
}

module.exports.createOrder = async function(req, res){
    try{
        const cart = await Cart.findOne({user:req.user.id}).populate('products');
        console.log(cart.products);


        const newOrder = await Orders.create({
            user: req.user.id,
            products: item
        })
        // user.cart = newCart;
        // user.save();
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