const express = require('express');

const router = express.Router();
const categoryApi = require('../../../controllers/api/v1/categories');
const passport = require('passport');

router.get('/', categoryApi.getCategory);
router.get('/products', categoryApi.getProducts);
router.post('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'))
router.post('/',passport.authenticate('jwt', {session: false}), categoryApi.createCategory);
router.delete('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'))
router.delete('/',passport.authenticate('jwt', {session: false}), categoryApi.removeCategory);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;