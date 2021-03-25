const mongoose = require('mongoose');

const topDeals = mongoose.Schema ({
    product: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
},{
    timestamps: true,
    versionKey: false
});

const Top_Deals = mongoose.model('Top_Deals',topDeals);

module.exports = Top_Deals;