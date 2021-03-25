const express = require('express');

const router = express.Router();
const topDeals = require('../../../controllers/api/v1/top_deals');
const passport = require('passport');

router.get('/', topDeals.getTopDeals);
router.post('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'))
router.post('/',passport.authenticate('jwt', {session: false}), topDeals.createTopDeals);
router.delete('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'))
router.delete('/',passport.authenticate('jwt', {session: false}), topDeals.removeTopDeals);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;