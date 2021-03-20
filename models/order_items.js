const mongoose = require('mongoose');

const order_items_Schema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity:{
        type: Number,
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders'
    }
},{
    timestamps: true,
    versionKey: false
});

const Order_items = mongoose.model('Order_items',order_items_Schema);

module.exports = Order_items;