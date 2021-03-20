const Daily_Essentials = require('../../../models/daily_essentials');


module.exports.getDailyEssentials = async function(req, res){
    try{
        const filterItem = {
            'product': false,
            'createdAt': false,
            'updatedAt': false,
            '__v': false
        }
        const daily_essentials = await Daily_Essentials.find({},filterItem).populate().exec();
        return res.status(200).json({
            message: "Daily Essentials List",
            data: daily_essentials
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
            'updatedAt': false,
            '__v': false
        }
        const daily_essentials = await Daily_Essentials.findById(req.body.id,filterItem).populate('products',filterItem).exec();
        return res.status(200).json({
            message: "List of Products",
            data: daily_essentials
        })
    }
    catch(error){
        console.log('Error in fetching daily essentials',error);
        return res.status(500).json({
        message: 'Error in fetching daily essentials'
        });
    }
}

module.exports.createDailyEssentials = async function(req, res){
    try{
        req.body.img=req.body.img[0];
        Daily_Essentials.create(req.body, function(err, data){
            if(err){
                return res.status(500).json({
                    message: 'Error in creating Daily Essentials'
                });
            }
            return res.status(200).json({
                message: 'Daily Essentials added Sucessfully'
            })
    });
    }
    catch(error){
        console.log('Error in creating Daily Essentials',error);
        return res.status(500).json({
        message: 'Error in creating Daily Essentials'
        });
    }
}