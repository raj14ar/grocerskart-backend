
const express = require('express');

const router = express.Router();
const daily_essentials = require('../../../controllers/api/v1/daily_essentials');
const passport = require('passport');

router.get('/', daily_essentials.getDailyEssentials);
router.get('/products', daily_essentials.getProducts);
router.post('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'))
router.post('/',passport.authenticate('jwt', {session: false}), daily_essentials.createDailyEssentials);
router.delete('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'))
router.delete('/',passport.authenticate('jwt', {session: false}), daily_essentials.removeDailyEssentials);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;