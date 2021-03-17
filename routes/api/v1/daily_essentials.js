
const express = require('express');

const router = express.Router();
const daily_essentials = require('../../../controllers/api/v1/daily_essentials');

router.get('/', daily_essentials.getAll);
router.post('/products', daily_essentials.getProducts);
router.post('/', require('../../../config/middleware'))
router.post('/', daily_essentials.create);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;