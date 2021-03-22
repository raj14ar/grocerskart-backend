const Product = require('../../../models/products');
const Category = require('../../../models/categories');
const Daily_Essentials = require('../../../models/daily_essentials');
const User = require('../../../models/users');


module.exports.getProducts = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false,
            '__v': false
        }
        const product = await Product.find({},filterItem);
        return res.status(200).json({
            data: product
        })
    }
    catch(error){
        console.log('Error in fetching product',error);
        return res.status(500).json({
        message: 'Error in fetching product'
        });
    }
}

module.exports.createProducts = async function(req, res){
    try{
        const category = await Category.findById(req.body.category);
        const daily_essentials = await Daily_Essentials.findById(req.body.daily_essentials);
        if(!category){
            return res.status(500).json({
                message: "Category name don't exists"
                });
        }
        req.body.discount = Math.floor(((req.body.market_price - req.body.price)*100)/req.body.market_price);
        const product = await Product.create(req.body);
        if(product){
            category.products.push(product);
            category.save();
            if(daily_essentials){
                daily_essentials.products.push(product);
                if(daily_essentials.maxDiscount<product.discount){
                    daily_essentials.maxDiscount=product.discount;
                }
                daily_essentials.save();
            }

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