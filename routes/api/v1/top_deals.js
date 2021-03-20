const express = require('express');

const router = express.Router();
const topDeals = require('../../../controllers/api/v1/top_deals');

router.get('/', topDeals.getTopDeals);
router.post('/', topDeals.createTopDeals);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;