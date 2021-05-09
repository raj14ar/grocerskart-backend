const express = require('express');

const router = express.Router();
const userOrdersApi = require('../../../controllers/api/v1/user_orders');
const mailer = require('../../../mailers/new_order_mailer');
const passport = require('passport');

router.get('/',passport.authenticate('jwt', {session: false}) ,userOrdersApi.getAllUserOrder);
router.post('/',passport.authenticate('jwt', {session: false}), userOrdersApi.createOrder);
router.post('/',passport.authenticate('jwt', {session: false}), mailer.newOrder);
router.post('/details',passport.authenticate('jwt', {session: false}), userOrdersApi.getOrderDeatils);
router.post('/status',passport.authenticate('jwt', {session: false}), userOrdersApi.getOrderStatus);
router.put('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'))
router.put('/', passport.authenticate('jwt', {session: false}),userOrdersApi.updateOrderStatus);
router.post('/detailsByOrderId',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'));
router.post('/detailsByOrderId',passport.authenticate('jwt', {session: false}), userOrdersApi.getOrderDeatilsAdmin);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;