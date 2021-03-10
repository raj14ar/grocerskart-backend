const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema ({

    name:
    {
        type: String,
        unique: true,
        default: 'My Wishlist'

    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }
    ,
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
},{
    timestamps: true
});

const Wishlist = mongoose.model('Wishlist',wishlistSchema);

module.exports = Wishlist;