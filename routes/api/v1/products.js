const express = require('express');
const router = express.Router();
const productApi = require('../../../controllers/api/v1/product')
router.get('/', productApi.getAll);
router.post('/', require('../../../config/middleware'))
router.post('/', productApi.create);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;