const express = require('express');

const router = express.Router();
const categoryApi = require('../../../controllers/api/v1/categories');

router.get('/', categoryApi.getAll);
router.post('/', categoryApi.create);
module.exports = router;