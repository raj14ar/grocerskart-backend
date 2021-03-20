const express = require('express');
const router = express.Router();
const productApi = require('../../../controllers/api/v1/product')
router.get('/', productApi.getProducts);
router.post('/', require('../../../config/middleware'))
router.post('/', productApi.createProducts);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;