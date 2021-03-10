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
    avatar: {
        type: String
    }
},{
    timestamps: true
});

const User = mongoose.model('User',usersSchema);

module.exports = User;