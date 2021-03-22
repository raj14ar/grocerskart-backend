const Product = require("../../../models/products");
const escapeStringRegexp = require("escape-string-regexp");
module.exports.search = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false
        }
        let $regex = escapeStringRegexp(req.body.search_term);
        const result = await Product.find({ tag : { $regex , $options: 'i'}},filterItem).populate().exec();
        return res.status(200).json({
            data: result
        })
    }
    catch(error){
        console.log('Error in fetching search result',error);
        return res.status(500).json({
        message: 'Error in fetching search result'
        });
    }
}