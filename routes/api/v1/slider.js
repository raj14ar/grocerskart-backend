const express = require('express');

const router = express.Router();
const sliderApi = require('../../../controllers/api/v1/slider');
const passport = require('passport');

router.get('/', sliderApi.getSlider);
router.post('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'))
router.post('/',passport.authenticate('jwt', {session: false}), sliderApi.createSlider);
router.delete('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'))
router.delete('/',passport.authenticate('jwt', {session: false}), sliderApi.removeSlider);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;