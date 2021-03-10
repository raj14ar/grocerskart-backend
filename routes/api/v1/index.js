const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/categories', require('./categories'));
router.use('/products', require('./products'));
router.use('/wishlist', require('./wishlist'));

module.exports = router;