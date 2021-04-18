const express = require('express');

const router = express.Router();
const search = require('../../../controllers/api/v1/search');

router.post('/', search.search);
router.post('/suggestions', search.searchSuggestions);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;