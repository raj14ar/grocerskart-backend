const express = require('express');
const router = express.Router();
const userApi = require('../../../controllers/api/v1/user');
const passport = require('passport');
router.get('/',passport.authenticate('jwt', {session: false}) ,userApi.getUser);
router.post('/',passport.authenticate('jwt', {session: false}) ,userApi.updateUser);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;