const mongoose = require('mongoose');

const usersSchema = mongoose.Schema ({
    
    name:{
        type: String
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Orders'
        }
    ],
    email: {
        type: String
    },
    gender: {
        type: String
    },
    referred: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    }],
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    referralCode: {
        type: String
    },
    wishlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist'
    }
},{
    timestamps: true,
    versionKey: false
});

const User = mongoose.model('User',usersSchema);

module.exports = User;