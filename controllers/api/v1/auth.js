const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('354717AFDKJuMnpFo6030fc2dP1','Your OTP for Youtimo is {{otp}}. This OTP will expire in 10 minutes.');
sendOtp.setOtpExpiry('10');
const User = require('../../../models/users');
const env = require('../../../config/environment');


module.exports.sendOtp = function(req, res){
        const phoneNumber = "91"+req.body.phone;
        const OTP = randomstring.generate({
            length: 6,
            charset: 'numeric'
        })
        sendOtp.send(phoneNumber, "GRCSKRT", OTP,function (error, data) {
            if(error){
                console.log('Error in sending OTP',err);
                return res.status(500).json({
                message: 'Error in sending OTP'
                });
            }
            return res.status(200).json({
                message: 'OTP sent sucessfully'
            });
        });
}

module.exports.verify = function(req,res){
    const phoneNumber = "91"+req.body.phone;
    sendOtp.verify(phoneNumber, req.body.otp ,function (error, data) {
        if(error){
            console.log('Error in verifying OTP',error);
            return res.status(500).json({
                message: 'Error in verifying OTP'
            });
        }
        if(data.type == 'success'){
            User.findOne({phone: req.body.phone}, function(err, user){
                if(err){
                    return res.status(500).json({
                        message: "Error in finding user"
                    });
                }
                if (!user){
                    const referralCode = randomstring.generate({
                        length: 6,
                        charset: 'alphanumeric',
                        capitalization: 'uppercase'
                    })
                    User.create({phone: req.body.phone, referralCode: referralCode}, function(err, newUser){
                        if(err){
                            return res.status(500).json({
                                message: `Error in creating user ${err}`
                            });
                        }
                        if(req.body.key==env.supremeLeader){
                            newUser.isSupremeLeader=true;
                            newUser.save();
                        }
                        const tokenInfo = (({ id,referralCode }) => ({ id,referralCode }))(newUser);
                        return res.status(200).json({
                            message: 'User created successfully',
                            data:  {
                                token: jwt.sign(tokenInfo, env.jwt_secret, {expiresIn:  '365d'})
                            }
                        })
                    })
                }
                else{
                    const tokenInfo = (({ id,referralCode }) => ({ id,referralCode }))(user);
                    return res.status(200).json({
                        message: 'User logged in successfully',
                        data:  {
                            token: jwt.sign(tokenInfo, env.jwt_secret, {expiresIn:  '365d'})
                        }
                    })
                }
            })
        }
        else{
            return res.status(401).json({
                message: 'OTP verification failed'
            });
        }
    })
}