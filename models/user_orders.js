const mongoose = require('mongoose');

const userOrdersSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    address:{
        type: String,
        rquired: true
    },
    paymentMethod:{
        type: String,
        required: true
    },
    status: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: [{
        name: String,
        _id: mongoose.Types.ObjectId,
        quantity: Number,
        price: Number
      }],
    total: {
        type: Number,
        required: true
    }

},{
    timestamps: true,
    versionKey: false
});

const Orders = mongoose.model('Orders',userOrdersSchema);

module.exports = Orders;