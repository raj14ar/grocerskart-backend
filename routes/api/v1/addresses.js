const express = require('express');

const router = express.Router();
const addressApi = require('../../../controllers/api/v1/addresses');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session: false}),addressApi.getAddresses);
router.post('/',passport.authenticate('jwt', {session: false}), addressApi.addAddress);
router.delete('/',passport.authenticate('jwt', {session: false}), addressApi.destroyAddress);
router.put('/',passport.authenticate('jwt', {session: false}), addressApi.updateAddress);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;