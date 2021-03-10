const Category = require('../../../models/category');


module.exports.getAll = async function(req, res){
    try{
        const category = await Category.find({}).populate();
        return res.json(200, {
            message: "List of Catogeries",
            Categories: category
        })
    }
    catch(error){
        console.log('Error in fetching categories',error);
        return res.status(500).json({
        message: 'Error in fetching categories'
        });
    }
}

module.exports.create = async function(req, res){
    try{
        Category.create(req.body, function(err, data){
            if(err){
                return res.status(500).json({
                    message: 'Error in creating category'
                });
            }
            return res.json(200, {
                message: 'Catogery added Sucessfully'
            })
    });
    }
    catch(error){
        console.log('Error in creating category',error);
        return res.status(500).json({
        message: 'Error in creating category'
        });
    }
}