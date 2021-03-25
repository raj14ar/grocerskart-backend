const mongoose = require('mongoose');
const Top_Deals = require('../../../models/top_deals');
const Product = require('../../../models/products');

module.exports.getTopDeals = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false
        }
        const products = await Top_Deals.find({},filterItem).populate('product',filterItem).exec();
        const maxDiscount = Math.max(...products.map(items => items.product.discount), 0);
        return res.status(200).json({
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

module.exports.createTopDeals = async function(req, res){
    try{
        const already = await Top_Deals.findOne({product: req.body.productId});
        if(!already){
            const data = await Top_Deals.create({product:mongoose.Types.ObjectId(req.body.productId)});
            return res.status(200).json({
                message: 'Product added Sucessfully to deals'
            })
        }
        else{
            return res.status(409).json({
                message: 'Product already exists in top deals'
            })
        }
    }
    catch(error){
        console.log('Error in adding to top deals',error);
        return res.status(500).json({
        message: 'Error in adding to top deals'
        });
    }
}
module.exports.removeTopDeals = async function(req, res){
    try{
        const data = await Top_Deals.findByIdAndDelete(req.body.id);
        return res.status(200).json({
            message: 'Product deleted Sucessfully to deals'
        })
    }
    catch(error){
        console.log('Error in deleting to top deals',error);
        return res.status(500).json({
        message: 'Error in deleting to top deals'
        });
    }
}