const Category = require('../../../models/categories');


module.exports.getCategory = async function(req, res){
    try{
        const filterItem = {
            'product': false,
            'createdAt': false,
            'updatedAt': false,
            '__v': false
        }
        const category = await Category.find({},filterItem).populate().exec();
        return res.status(200).json({
            message: "List of Catogeries",
            data: category
        })
    }
    catch(error){
        console.log('Error in fetching categories',error);
        return res.status(500).json({
        message: 'Error in fetching categories'
        });
    }
}
module.exports.getProducts = async function(req, res){
    try{

        const filterItem = {
            'createdAt': false,
            'updatedAt': false
        }
        const products = await Category.findById(req.body.id,filterItem).populate('products',filterItem).exec();
        return res.status(200).json({
            data: products
        })
    }
    catch(error){
        console.log('Error in fetching categories',error);
        return res.status(500).json({
        message: 'Error in fetching categories'
        });
    }
}

module.exports.createCategory = async function(req, res){
    try{
        req.body.img=req.body.img[0];
        const category = await Category.create(req.body);
        return res.status(200).json({
            message: 'Catogery added Sucessfully'
        })
    }
    catch(error){
        console.log('Error in creating category',error);
        return res.status(500).json({
        message: 'Error in creating category'
        });
    }
}