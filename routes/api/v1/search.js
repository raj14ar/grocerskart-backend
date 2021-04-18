const express = require('express');
const passport = require('passport');
const router = express.Router();
const search = require('../../../controllers/api/v1/search');

router.post('/', search.search);
router.post('/suggestions', search.searchSuggestions);
router.post('/',passport.authenticate('jwt', {session: false}), require('../../../config/middleware'));
router.post('/tag',passport.authenticate('jwt', {session: false}),search.getTag);
router.use('*', function(req, res){
    res.status(404).json({
        message: 'Page Not Found'
    });
});
module.exports = router;