const mongoose = require('mongoose');

const userAddressesSchema = new mongoose.Schema({
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
        ref: 'User'
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
    timestamps: true,
    versionKey: false
});

const Address = mongoose.model('Address',userAddressesSchema);

module.exports = Address;