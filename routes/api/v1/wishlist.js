const express = require('express');

const router = express.Router();
const wishlistApi = require('../../../controllers/api/v1/wishlist');

router.get('/', wishlistApi.getAll);
router.post('/', wishlistApi.create);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;