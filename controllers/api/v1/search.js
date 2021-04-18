const Product = require("../../../models/products");
module.exports.search = async function(req, res){
    try{
        const filterItem = {
            'createdAt': false,
            'updatedAt': false,
            'tag': false
        }
        let searchTerms = req.body.search_term.replace(/ /g, "|");
        const result = await Product.find({ tag: {$regex:  searchTerms , $options: 'i'}},filterItem).populate();
        return res.status(200).json({
            data: result
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in fetching search result ${error.message}`
        });
    }
}
module.exports.searchSuggestions = async function(req, res){
    try{
        const filterItem = {
            'name': true,
            '_id': false
        }
        let searchTerms = req.body.search_term.replace(/ /g, "|");
        const result = await Product.find({ tag: {$regex:  searchTerms , $options: 'i'}},filterItem);
        return res.status(200).json({
            data: result
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in fetching search result ${error.message}`
        });
    }
}
module.exports.getTag = async function(req, res){
    try{
        const filterItem = {
            'name': true,
            'tag': true
        }
        let searchTerms = req.body.search_term.replace(/ /g, "|");
        const result = await Product.find({ tag: {$regex:  searchTerms , $options: 'i'}},filterItem);
        return res.status(200).json({
            data: result
        })
    }
    catch(error){
        return res.status(500).json({
        message: `Error in fetching search result ${error.message}`
        });
    }
}
