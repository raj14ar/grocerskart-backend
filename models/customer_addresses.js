const mongoose = require('mongoose');

const customer_addresses_Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    landmark: {
        type: String
    }
},{
    timestamps: true
});

const Address = mongoose.model('Address',customer_addresses_Schema);

module.exports = Address;