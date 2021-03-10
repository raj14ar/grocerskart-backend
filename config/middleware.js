const Category = require('../models/category');
module.exports.checkCategory = async function(req, res, next){
    try{
        const isValid = await Category.findOne({name: req.body.category});
        console.log('inside middleware',isValid);
        if(!isValid){
            return res.status(500).json({
                message: "Category name don't exists"
                });
        }
        next();
    }
    catch(error){
        console.log('Error in category name',error);
        return res.status(500).json({
        message: 'Error in category name'
        });
    }
}