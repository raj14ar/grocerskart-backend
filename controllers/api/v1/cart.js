const Cart = require('../../../models/cart');
const User = require('../../../models/users');
const mongoose = require('mongoose');
const Product = require('../../../models/products');

module.exports.getCart = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false,
            'user': false
        }
        const cart = await Cart.findOne({user: req.user._id},filterItem).populate('products._id');
        if(cart){
            cart.products.forEach(element =>  {
                element.price= element._id.price;
                element.mrp= element._id.mrp;
                element.discount= element._id.discount;
                element._id=element._id._id;
            });
        }
        return res.status(200).json({
            data: cart
        })
    }
    catch(error){
        console.log('Error in fetching cart',error);
        return res.status(500).json({
        message: `Error in fetching cart ${error.message}`
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
                alreadyAvailable=true;
                }
            });
            if(!alreadyAvailable && product){
                let item = {
                    name : product.name,
                    _id : mongoose.Types.ObjectId(product.id),
                    price : product.price,
                    quantity : 1,
                    img: product.img,
                    mrp: product.mrp,
                    discount: product.discount
                };
                if(req.body.quantity && req.body.quantity>0){
                    item.quantity=req.body.quantity;
                }
                let total = item.quantity*item.price;
                cart.total = cart.total+total;
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
                img: product.img,
                mrp: product.mrp,
                discount: product.discount
            };
            if(req.body.quantity){
                item.quantity=req.body.quantity;
            }
            let total = item.quantity*item.price;
            const newCart = await Cart.create({
                user: req.user.id,
                products: item,
                total: total
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
        message: `Error in adding to cart ${error.message}`
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
                    cart.total=(cart.total-(cart.products[i].price*cart.products[i].quantity));
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
        message: `Error in deleting product from cart ${error.message}`
        });
    }
}
module.exports.updateCart = async function(req, res){
    try{
        const cart = await Cart.findOne({user: req.user.id});
        if(cart){
            if(cart.products.length==0){
                return res.status(409).json({
                    message: 'No products to modify'
                })
            }
            for( let i = 0; i < cart.products.length; i++){
                if ( cart.products[i]._id == req.body.id && req.body.quantity>0) { 
                    cart.total=(cart.total-(cart.products[i].quantity*cart.products[i].price)+(req.body.quantity*cart.products[i].price));
                    cart.products[i].quantity= req.body.quantity;
                }
            }
            cart.save();
        }
        return res.status(200).json({
            message: 'Cart sucessfully updated'
        })
    }
    catch(error){
        console.log('Error in updating product from cart',error);
        return res.status(500).json({
        message: `Error in updating product from cart ${error.message}`
        });
    }
}