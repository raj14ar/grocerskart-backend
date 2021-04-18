const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
// router.get('/', homeController.home);
router.use('/api', require('./api'));

router.use('*', function(req, res){
    res.status(404).json({
        message: `Page Not Found ${req.get('host')}+${req.originalUrl}`
    });
  });
module.exports = router;