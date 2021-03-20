const Cart = require('../../../models/cart');
const User = require('../../../models/users');
const mongoose = require('mongoose');

module.exports.getCart = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false
        }
        const cart = await Cart.findOne({user: req.user.id},filterItem).populate('products',filterItem);
        return res.status(200).json({
            data: cart
        })
    }
    catch(error){
        console.log('Error in fetching cart',error);
        return res.status(500).json({
        message: 'Error in fetching cart'
        });
    }
}

module.exports.createCart = async function(req, res){
    try{
        const cart = await Cart.findOne({user: req.user.id});
        if(cart){
            const exists = cart.products.includes(req.body.id);
            if(!exists){
                cart.products.push(mongoose.Types.ObjectId(req.body.id));
                cart.save();
            }
            else{
                return res.status(409).json({
                    message: 'Product already exists in cart'
                })
            }
        }
        else{
            const cart = await Cart.create({user: req.user.id});
            const user = await User.findById(req.user.id);
            user.cart = cart;
            user.save();
            cart.products.push(mongoose.Types.ObjectId(req.body.id));
            cart.save();
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

module.exports.removeCart = async function(req, res){
    try{
        const cart = await Cart.findOne({user: req.user.id}).populate('products').exec();
        for( let i = 0; i < cart.products.length; i++){
            if ( cart.products[i] === req.body.id) { 
                cart.products.splice(i, 1); 
                i--; 
            }
        }
        cart.save();
        return res.status(200).json({
            message: 'Product sucessfully deleted from cart'
        })
    }
    catch(error){
        console.log('Error in deleting product from cart',error);
        return res.status(500).json({
        message: 'Error in deleting product from cart'
        });
    }
}