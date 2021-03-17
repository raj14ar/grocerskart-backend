const mongoose = require('mongoose');
const productsSchema = mongoose.Schema ({
    name:{
        type: String,
        required: true,
        unique: true
    },
    market_price:{
        type: Number,
        required: true
    },
    size:{
        type: String,
        required: true
    }
    ,
    price:{
        type: Number,
        required: true
    },
    discount:{
        type: Number,
        required: true
    },
    img: [
        {
            type: String
        }
    ],
    brand: {
        type: String
    }
    ,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    daily_essentials: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Daily_Essentials'
    },
    variants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }
    ],
    description: {
        type: String
    },
    max_purchase_limit: {
        type: Number
    },
    tag: {
            type: String
        }
},{
    timestamps: true
});

const Product = mongoose.model('Product',productsSchema);

module.exports = Product;