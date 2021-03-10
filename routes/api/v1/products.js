const express = require('express');
const router = express.Router();
const productApi = require('../../../controllers/api/v1/product');

router.get('/', productApi.getAll);
router.post('/', productApi.create);
module.exports = router;