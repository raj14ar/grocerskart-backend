const mongoose = require('mongoose');
const productsSchema = mongoose.Schema ({
    name:{
        type: String,
        required: true,
        unique: true
    },
    mrp:{
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
    dailyEssentials: {
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
    maxPurchaseLimit: {
        type: Number
    },
    tag: {
            type: String
        }
},{
    timestamps: true,
    versionKey: false
});

const Product = mongoose.model('Product',productsSchema);

module.exports = Product;