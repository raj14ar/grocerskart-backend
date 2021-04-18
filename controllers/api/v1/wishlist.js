const Wishlist = require('../../../models/wishlist');
const User = require('../../../models/users');
const mongoose = require('mongoose');

module.exports.getWishlist = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false,
            'tag': false,
            'user': false
        }
        const wishlist = await Wishlist.findOne({user: req.user.id},filterItem).populate('products',filterItem);
        return res.status(200).json({
            data: wishlist
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in fetching wishlist ${error.message}`
        });
    }
}

module.exports.createWishlist = async function(req, res){
    try{
        const wishlist = await Wishlist.findOne({user: req.user.id});
        if(wishlist){
            const exists = wishlist.products.includes(req.body.id);
            if(!exists){
                wishlist.products.push(mongoose.Types.ObjectId(req.body.id));
                wishlist.save();
            }
            else{
                return res.status(409).json({
                    message: 'Product already exists in wishlist'
                })
            }
        }
        else{
            const wishlist = await Wishlist.create({user: req.user.id});
            const user = await User.findById(req.user.id);
            user.wishlist = wishlist;
            user.save();
            wishlist.products.push(mongoose.Types.ObjectId(req.body.id));
            wishlist.save();
        }
        return res.status(200).json({
            message: `Product Sucessfully added to wishlist ${error.message}`
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in adding to wishlist ${error.message}`
        });
    }
}

module.exports.removeWishlist = async function(req, res){
    try{
        const wishlist = await Wishlist.findOne({user: req.user.id}).populate('products');
        for( let i = 0; i < wishlist.products.length; i++){
            if ( wishlist.products[i]._id == req.body.id) {
                wishlist.products.splice(i, 1); 
                i--; 
            }
        }
        wishlist.save();
        return res.status(200).json({
            message: 'Product sucessfully deleted from wishlist'
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in deleting product from wishlist ${error.message}`
        });
    }
}