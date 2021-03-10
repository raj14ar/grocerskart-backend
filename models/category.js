const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema ({
    name:{
            type: String,
            required: true,
            unique: true
        }
    ,
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    img: {
        type: String
    }
},{
    timestamps: true
});

const Category = mongoose.model('Category',categorySchema);

module.exports = Category;