const express = require('express');

const router = express.Router();
const userOrdersApi = require('../../../controllers/api/v1/user_orders');
const mailer = require('../../../mailers/new_order_mailer');
const passport = require('passport');

router.get('/',passport.authenticate('jwt', {session: false}) ,userOrdersApi.getAllUserOrder);
router.post('/',passport.authenticate('jwt', {session: false}), userOrdersApi.createOrder);
router.post('/',passport.authenticate('jwt', {session: false}), mailer.newOrder);
router.get('/details',passport.authenticate('jwt', {session: false}), userOrdersApi.getOrderDeatils);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;