const express = require('express');

const router = express.Router();
const authApi = require('../../../controllers/api/v1/auth');

router.post('/send-otp', authApi.sendOtp);
router.post('/verify', authApi.verify);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});

module.exports = router;