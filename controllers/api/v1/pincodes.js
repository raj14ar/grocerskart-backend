const Pincode = require("../../../models/pincodes");


module.exports.getPincode = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false
        }
        const pincode = await Pincode.find({},filterItem);
        return res.status(200).json({
            data: pincode
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in fetching pincode ${error.message}`
        });
    }
}

module.exports.createPincode = async function(req, res){
    try{
        const pincode = await Pincode.create({pincode: req.body.pincode, city: req.body.city});
        return res.status(200).json({
            message: 'Pincode added Sucessfully'
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in creating pincode ${error.message}`
        });
    }
}

module.exports.removePincode = async function(req, res){
    try{
        const pincode = await Pincode.findOneAndDelete(req.body.id);
        return res.status(200).json({
            message: 'Pincode deleted Sucessfully'
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in deleting pincode ${error.message}`
        });
    }
}
module.exports.searchPincode = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false
        }
        const pincode = await Pincode.findOne({pincode:req.body.pincode},filterItem);
        return res.status(200).json({
            data: pincode
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in fetching pincode ${error.message}`
        });
    }
}