const express = require('express');
const router = express.Router();
const productApi = require('../../../controllers/api/v1/product')
const passport = require('passport');
router.get('/', productApi.getProducts);
router.post('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'))
router.post('/', passport.authenticate('jwt', {session: false}),productApi.createProducts);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;