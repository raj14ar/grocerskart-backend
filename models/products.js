const mongoose = require('mongoose');

const productsSchema = mongoose.Schema ({
    name:{
        type: String,
        required: true
    },
    market_price:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    brand: {
        type: String
    }
    ,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String
    }
},{
    timestamps: true
});

const Product = mongoose.model('Product',productsSchema);

module.exports = Product;