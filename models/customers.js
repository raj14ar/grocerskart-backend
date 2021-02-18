const mongoose = require('mongoose');

const customersSchema = mongoose.Schema ({
    
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
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

const Customer = mongoose.model('Customer',customersSchema);

module.exports = Customer;