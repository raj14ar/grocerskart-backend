const mongoose = require('mongoose');
const Top_Deals = require('../../../models/top_deals');
const Product = require('../../../models/products');

module.exports.getTopDeals = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false,
            'tag': false
        }
        const filterItem2 = {
            'createdAt': false,
            'updatedAt': false,
            '_id': false
        }
        const products = await Top_Deals.find({},filterItem2).populate('product',filterItem).exec();
        let maxDiscount=0;
        if(products){
            maxDiscount = Math.max(...products.map(items => items.product?items.product.discount:0), 0);
        }
        return res.status(200).json({
            data: products,
            maxDiscount: maxDiscount
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in fetching top deals ${error.message}`
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
        return res.status(500).json({
        message: `Error in adding to top deals ${error.message}`
        });
    }
}
module.exports.removeTopDeals = async function(req, res){
    try{
        const data = await Top_Deals.findOneAndDelete({product: req.body.id});
        return res.status(200).json({
            message: 'Product deleted Sucessfully to deals'
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in deleting to top deals ${error.message}`
        });
    }
}