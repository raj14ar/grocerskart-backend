const mongoose = require('mongoose');

const categorySchema = mongoose.Schema ({
    name:{
            type: String,
            required: true,
            unique: true
        }
    ,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    img: [
        {
            type: String
        }
    ]
},{
    timestamps: true,
    versionKey: false
});

const Category = mongoose.model('Category',categorySchema);

module.exports = Category;