const Product = require('../../../models/products');
const Category = require('../../../models/categories');
const mongoose = require('mongoose');
module.exports.getAll = async function(req, res){
    try{
        const product = await Product.find({}).populate();
        return res.status(200).json({
            message: "List of Product",
            Product: product
        })
    }
    catch(error){
        console.log('Error in fetching product',error);
        return res.status(500).json({
        message: 'Error in fetching product'
        });
    }
}

module.exports.create = async function(req, res){
    try{
        const category = await Category.findOne({name: req.body.category});
        if(!category){
            return res.status(500).json({
                message: "Category name don't exists"
                });
        }
        else{
            req.body.category = mongoose.Types.ObjectId(category._id);
        }
        req.body.discount = Math.floor(((req.body.market_price - req.body.price)*100)/req.body.market_price);
        const product = await Product.create(req.body);
        if(product){
            category.products.push(product);
            category.save();
            return res.status(200).json({
                message: 'Product Sucessfully added'
            })
        }
    }
    catch(error){
        console.log('Error in adding product',error);
        return res.status(500).json({
        message: 'Error in adding product'
        });
    }
}