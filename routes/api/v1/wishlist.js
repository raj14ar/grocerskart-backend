const express = require('express');

const router = express.Router();
const wishlistApi = require('../../../controllers/api/v1/wishlist');
const passport = require('passport');

router.get('/',passport.authenticate('jwt', {session: false}) ,wishlistApi.getWishlist);
router.post('/',passport.authenticate('jwt', {session: false}), wishlistApi.createWishlist);
router.delete('/',passport.authenticate('jwt', {session: false}), wishlistApi.removeWishlist);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;