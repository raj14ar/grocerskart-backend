const express = require('express');

const router = express.Router();
const pincodeApi = require('../../../controllers/api/v1/pincodes');
const passport = require('passport');

router.get('/', pincodeApi.getPincode);
router.post('/search', pincodeApi.searchPincode);
router.post('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'))
router.post('/',passport.authenticate('jwt', {session: false}), pincodeApi.createPincode);
router.delete('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'))
router.delete('/',passport.authenticate('jwt', {session: false}), pincodeApi.removePincode);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;