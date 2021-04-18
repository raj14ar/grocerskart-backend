const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/categories', require('./categories'));
router.use('/products', require('./products'));
router.use('/top-deals', require('./top_deals'));
router.use('/daily-essentials', require('./daily_essentials'));
router.use('/wishlist', require('./wishlist'));
router.use('/search', require('./search'));
router.use('/user',require('./user'));
router.use('/cart',require('./cart'));
router.use('/addresses',require('./addresses'));
router.use('/orders',require('./user_orders'));
router.use('/slider',require('./slider'));

router.use('*', function(req, res){
    res.status(404).json({
        message: `Page Not Found ${req.get('host')}${req.originalUrl}`
    });
  });
module.exports = router;