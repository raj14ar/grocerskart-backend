const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
// router.get('/', homeController.home);
router.use('/api', require('./api'));

router.use('*', function(req, res){
    res.status(404).send('Page Not Found');
});
module.exports = router;