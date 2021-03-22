const mongoose = require('mongoose');

const userAddressesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    user:{
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