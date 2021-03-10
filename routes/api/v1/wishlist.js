const express = require('express');

const router = express.Router();
const wishlistApi = require('../../../controllers/api/v1/wishlist');

router.get('/', wishlistApi.getAll);
router.post('/', wishlistApi.create);
module.exports = router;