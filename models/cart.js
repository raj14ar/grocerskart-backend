const mongoose = require('mongoose');

const cartSchema = mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
},{
    timestamps: true,
    versionKey: false
});

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;