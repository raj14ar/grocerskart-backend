const mongoose = require('mongoose');

const dailyEssentialsSchema = mongoose.Schema ({
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
    ],
    maxDiscount: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

const Daily_Essentials = mongoose.model('Daily_Essentials',dailyEssentialsSchema);

module.exports = Daily_Essentials;