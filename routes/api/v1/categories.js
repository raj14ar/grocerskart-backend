const express = require('express');

const router = express.Router();
const categoryApi = require('../../../controllers/api/v1/categories');

router.get('/', categoryApi.getAll);
router.post('/products', categoryApi.getProducts);
router.post('/', require('../../../config/middleware'))
router.post('/', categoryApi.create);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;