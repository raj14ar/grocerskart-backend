const Wishlist = require('../../../models/wishlist');


module.exports.getAll = async function(req, res){
    try{
        const wishlist = await Wishlist.find({}).populate();
        return res.json(200, {
            message: "Products of wishlist",
            Wishlist: wishlist
        })
    }
    catch(error){
        console.log('Error in fetching wishlist',error);
        return res.status(500).json({
        message: 'Error in fetching wishlist'
        });
    }
}

module.exports.create = async function(req, res){
    try{
        const wishlist = Wishlist.findOne({user:req.body.user});
        if(wishlist){
            wishlist.product.push(mongoose.Types.ObjectId(req.body.id));
            
        }
        else{
            Wishlist.create({}, function(err, data){
                if(err){
                    return res.status(500).json({
                        message: 'Error in adding to wishlist'
                    });
                }
                return res.json(200, {
                    message: 'Product Sucessfully added to wishlist'
                })
        });
        }
    }
    catch(error){
        console.log('Error in adding to wishlist',error);
        return res.status(500).json({
        message: 'Error in adding to wishlist'
        });
    }
}