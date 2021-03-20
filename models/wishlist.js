const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema ({

    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }
    ,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
},{
    timestamps: true,
    versionKey: false
});

const Wishlist = mongoose.model('Wishlist',wishlistSchema);

module.exports = Wishlist;