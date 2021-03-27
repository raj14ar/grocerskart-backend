const Product = require('../../../models/products');
const Category = require('../../../models/categories');
const Daily_Essentials = require('../../../models/daily_essentials');
const User = require('../../../models/users');


module.exports.getProducts = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false,
            'variants': false,
            'tag': false
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
module.exports.getProductDetails = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false,
            'tag': false
        }
        const product = await Product.findById(req.body.id,filterItem);
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
        req.body.discount = Math.floor(((req.body.mrp - req.body.price)*100)/req.body.mrp);
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
module.exports.removeProduct = async function(req, res){
    try{
        const product = await Product.findOneAndDelete(req.body.id);
        return res.status(200).json({
            message: 'Product Sucessfully deleted'
        })
    }
    catch(error){
        console.log('Error in fetching product',error);
        return res.status(500).json({
        message: 'Error in fetching product'
        });
    }
}
module.exports.updateProduct = async function(req, res){
    try{
        const product = await Product.findByIdAndUpdate(req.body.id,req.body);
        product.discount= Math.floor(((product.mrp - product.price)*100)/product.mrp);
        product.save();
        return res.status(200).json({
            message: 'Product updated Sucessfully'
        })
    }
    catch(error){
        console.log('Error in updating product',error);
        return res.status(500).json({
        message: 'Error in updating product'
        });
    }
}