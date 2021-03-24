const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');
const userOrdersSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        default: 0
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
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
    products: [{
        name: String,
        _id: mongoose.Types.ObjectId,
        quantity: Number,
        price: Number,
        img: [
            {
                type: String
            }
        ]
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