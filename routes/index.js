const express = require('express');
const router = express.Router();


router.use('/api', require('./api'));

router.use('*', function(req, res){
    res.status(404).send('Page Not Found');
});
module.exports = router;