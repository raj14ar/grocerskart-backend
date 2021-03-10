const mongoose = require('mongoose');

const userOrdersSchema = new mongoose.Schema({
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
        type: Number,
        required: true
    }
},{
    timestamps: true
});

const Orders = mongoose.model('Orders',userOrdersSchema);

module.exports = Orders;