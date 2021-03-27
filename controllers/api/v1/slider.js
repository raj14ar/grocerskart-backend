const Slider = require("../../../models/slider");


module.exports.getSlider = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false
        }
        const slider = await Slider.find({},filterItem);
        return res.status(200).json({
            data: slider
        })
    }
    catch(error){
        console.log('Error in fetching slider',error);
        return res.status(500).json({
        message: `Error in fetching slider ${error.message}`
        });
    }
}

module.exports.createSlider = async function(req, res){
    try{
        req.body.img = req.body.img[0];
        const slider = await Slider.create({img: req.body.img, category: req.body.category, device: req.body.device});
        return res.status(200).json({
            message: 'Slider added Sucessfully'
        })
    }
    catch(error){
        console.log('Error in creating slider',error);
        return res.status(500).json({
        message: `Error in creating slider ${error.message}`
        });
    }
}

module.exports.removeSlider = async function(req, res){
    try{
        const slider = await Slider.findOneAndDelete(req.body.id);
        return res.status(200).json({
            message: 'Slider deleted Sucessfully'
        })
    }
    catch(error){
        console.log('Error in deleting slider',error);
        return res.status(500).json({
        message: `Error in deleting slider ${error.message}`
        });
    }
}