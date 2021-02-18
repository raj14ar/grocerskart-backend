const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const customer_orders_Schema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order_items'
        }
    ],
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    status: {
        type: String
    },
    total: {
        type: Decimal128,
        required: true
    }
},{
    timestamps: true
});

const Orders = mongoose.model('Orders',customer_orders_Schema);

module.exports = Orders;