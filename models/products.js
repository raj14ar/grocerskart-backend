const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const productsSchema = mongoose.Schema ({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Decimal128,
        required: true
    },
    category: {
        type: String
    },
    description: {
        type: String
    }
},{
    timestamps: true
});

const Product = mongoose.model('Product',productsSchema);

module.exports = Product;