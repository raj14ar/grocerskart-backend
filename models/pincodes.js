const mongoose = require('mongoose');

const allowedPincodes = new mongoose.Schema({
    pincode: {
        type: Number,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});

const Pincode = mongoose.model('Pincode',allowedPincodes);

module.exports = Pincode;