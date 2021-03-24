const mongoose = require('mongoose');
const Address = require('../../../models/addresses');
const User = require('../../../models/users');

module.exports.getAddresses = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false
        }
        const user = await User.findById(req.user.id,filterItem).populate('addresses',filterItem);
        return res.status(200).json({
            data: user.addresses
        })
    }
    catch(error){
        console.log('Error in fetching addresses',error);
        return res.status(500).json({
        message: 'Error in fetching addresses'
        });
    }
}

module.exports.addAddress = async function(req, res){
    try{
        const user = await User.findById(req.user.id);
        if(user.addresses.length<20){
            req.body.user=req.user.id;
            const data = await Address.create(req.body);
            user.addresses.push(data);
            user.save();
            return res.status(200).json({
                message: 'Address added Sucessfully'
            })
        }
        else{
            return res.status(429).json({
                message: 'Max address limit reached'
            });
        }
    }
    catch(error){
        console.log('Error in adding address',error);
        return res.status(500).json({
        message: 'Error in adding address'
        });
    }
}
module.exports.destroyAddress = async function(req, res){
    try{
        const user = await User.findById(req.user.id);
        if(user.addresses.length>=0){
            const data = await Address.deleteOne({_id:req.body.id});
            for(let i=0;i<user.addresses.length;i++){
                if(user.addresses[i]._id == req.body.id){
                    user.addresses.splice(i, 1); 
                    i--; 
                }
            }
            user.save();
            return res.status(200).json({
                message: 'Address removed Sucessfully'
            })
        }
        else{
            return res.status(429).json({
                message: 'No address to remove'
            });
        }
    }
    catch(error){
        console.log('Error in removing address',error);
        return res.status(500).json({
        message: 'Error in removing address'
        });
    }
}
module.exports.updateAddress = async function(req, res){
    try{
        req.body.user=req.user.id;
        const data = await Address.updateOne({_id:req.body.id},req.body);
        return res.status(200).json({
            message: 'Address updated Sucessfully'
        })
    }
    catch(error){
        console.log('Error in updating address',error);
        return res.status(500).json({
        message: 'Error in updating address'
        });
    }
}