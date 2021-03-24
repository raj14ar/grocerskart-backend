const Cart = require('../../../models/cart');
const User = require('../../../models/users');
const mongoose = require('mongoose');
const Product = require('../../../models/products');

module.exports.getCart = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false
        }

        const cart = await Cart.findOne({user: req.user.id},filterItem).populate('products._id');
        if(cart){
            cart.products.forEach(element =>  {
                element.price= element._id.price;
                element._id=element._id._id
            });
        }
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
        const user = await User.findById(req.user.id).populate('cart');
        const product = await Product.findById(req.body.id);
        const cart = await Cart.findById(user.cart);
        if(cart){
            let alreadyAvailable = false;
            cart.products.forEach(element => {
            if(element._id==req.body.id){
                if(req.body.quantity!=element.quantity && req.body.quantity>0){
                    element.quantity=req.body.quantity;
                    cart.save();
                    return res.status(200).json({
                        message: 'Cart Sucessfully updated'
                    })
                }
                alreadyAvailable=true;
                }
            });
            if(!alreadyAvailable && product){
                let item = {
                    name : product.name,
                    _id : mongoose.Types.ObjectId(product.id),
                    price : product.price,
                    quantity : 1,
                    img: product.img
                };
                if(req.body.quantity){
                    item.quantity=req.body.quantity;
                }
                cart.products.push(item);
                cart.save();
            }
            else{
                return res.status(409).json({
                    message: 'Product already exists in cart'
                })
            }

        }
        else{
            let item = {
                name : product.name,
                _id : mongoose.Types.ObjectId(product.id),
                price : product.price,
                quantity : 1,
                img: product.img
            };
            if(req.body.quantity){
                item.quantity=req.body.quantity;
            }

            const newCart = await Cart.create({
                user: req.user.id,
                products: item
            })
            user.cart = newCart;
            user.save();
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
        const cart = await Cart.findOne({user: req.user.id});
        if(cart){
            if(cart.products.length==0){
                return res.status(409).json({
                    message: 'No products to remove'
                })
            }
            for( let i = 0; i < cart.products.length; i++){
                if ( cart.products[i]._id == req.body.id) { 
                    cart.products.splice(i, 1); 
                    i--; 
                }
            }
            cart.save();
        }
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