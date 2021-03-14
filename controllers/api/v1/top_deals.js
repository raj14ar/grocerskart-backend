const mongoose = require('mongoose');
const Top_Deals = require('../../../models/top_deals');
const Product = require('../../../models/products');

module.exports.getAll = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false,
            '__v': false
        }
        const products = await Top_Deals.find({},filterItem).populate('products',filterItem).exec();
        const maxDiscount = Math.max(...products.map(items => items.products.discount), 0);
        return res.status(200).json({
            message: "List of top deals",
            data: products,
            maxDiscount: maxDiscount
        })
    }
    catch(error){
        console.log('Error in fetching top deals',error);
        return res.status(500).json({
        message: 'Error in fetching top deals'
        });
    }
}

module.exports.create = async function(req, res){
    try{
        const product = await Product.findOne({name: req.body.name});
        const data = Top_Deals.create({products:mongoose.Types.ObjectId(product._id)});
        return res.status(200).json({
            message: 'Product added Sucessfully to deals'
        })
    }
    catch(error){
        console.log('Error in adding to top deals',error);
        return res.status(500).json({
        message: 'Error in adding to top deals'
        });
    }
}