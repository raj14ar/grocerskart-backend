const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
const userOrdersSchema = new mongoose.Schema({
    orderId: {
        type: Number,
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
userOrdersSchema.plugin(AutoIncrement, {inc_field: 'orderId'});
const Orders = mongoose.model('Orders',userOrdersSchema);

module.exports = Orders;