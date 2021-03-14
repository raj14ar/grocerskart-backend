const mongoose = require('mongoose');
const multerS3 = require('multer-s3');
const multer = require('multer');
const aws = require('aws-sdk');
let IMAGE_PATH = '';
const productsSchema = mongoose.Schema ({
    name:{
        type: String,
        required: true,
        unique: true
    },
    id:{
        type: String,
        required: true,
        unique: true
    },
    market_price:{
        type: Number,
        required: true
    },
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
        required: true
    },
    description: {
        type: String
    },
    max_purchase_limit: {
        type: Number
    },
    tag: [
        {
            type: String
        }
    ]
},{
    timestamps: true
});

const Product = mongoose.model('Product',productsSchema);

module.exports = Product;