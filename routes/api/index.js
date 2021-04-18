const express = require('express');

const router = express.Router();

router.use('/v1', require('./v1'));


router.use('*', function(req, res){
    res.status(404).json({
        message: `Page Not Found ${req.get('host')}${req.originalUrl}`
    });
  });

module.exports = router;