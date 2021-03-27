const mongoose = require('mongoose');

const cartSchema = mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        name: String,
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number,
        price: Number,
        mrp: Number,
        discount: Number,
        img: [
            {
                type: String
            }
        ]
      }],
        total: {
            type: Number,
            default: 0
        }
},{
    timestamps: true,
    versionKey: false
});

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;