const Product = require('../../../models/products');
const Daily_Essentials = require('../../../models/daily_essentials');
const User = require('../../../models/users');
const mongoose = require('mongoose');


module.exports.getUser = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false,
            'isSupremeLeader': false

        }
        const user = await User.findById(req.user.id,filterItem);
        return res.status(200).json({
            data: user
        })
    }
    catch(error){
        console.log('Error in fetching user',error);
        return res.status(500).json({
        message: 'Error in fetching user'
        });
    }
}

module.exports.updateUser = async function(req, res){
    try{
        const user = await User.findById(req.user.id);
        if(user){
            user.name= req.body.name;
            user.email= req.body.email;
        }
        if(req.body.referralCode){
            if(!user.referredBy){
                const referrer = await User.findOne({referralCode: req.body.referralCode});
                if(referrer){
                    user.referredBy=mongoose.Types.ObjectId(referrer._id);
                    referrer.referred.push(user._id);
                    referrer.save();
                }
            }
        }
        user.save();
        return res.status(200).json({
            message: "User updated sucessfully"
        })
    }
    catch(error){
        console.log('Error in updating user',error);
        return res.status(500).json({
        message: 'Error in updating user'
        });
    }
}

