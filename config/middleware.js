const multerS3 = require('multer-s3');
const multer = require('multer');
const aws = require('aws-sdk');
const express = require('express');
const router = express.Router();
const User = require('../models/users');


router.post('/',function(req, res, next){
  User.findById(req.user.id,function(err,user){
    if(err){
      return res.status(500).json({
        message: 'Error in finding user'
      })
    }
    if(user.isSupremeLeader){
      next();
    }
    else{
      return res.status(401).send("Unauthorized");
    }
  })
})
router.put('/',function(req, res, next){
  User.findById(req.user.id,function(err,user){
    if(err){
      return res.status(500).json({
        message: 'Error in finding user'
      })
    }
    if(user.isSupremeLeader){
      next();
    }
    else{
      return res.status(401).send("Unauthorized");
    }
  })
})

router.delete('/',function(req, res, next){
  User.findById(req.user.id,function(err,user){
    if(err){
      return res.status(500).json({
        message: 'Error in finding user'
      })
    }
    if(user.isSupremeLeader){
      next();
    }
    else{
      return res.status(401).send("Unauthorized");
    }
  })
})



const s3 = new aws.S3({
  accessKeyId: process.env.YOUTIMO_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.YOUTIMO_AWS_SECRET_ACCESS_KEY
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  fileFilter,
  limits: {
    fileSize: 1024*1024*5,
    files: 5
  },
  storage: multerS3({
    s3: s3,
    bucket: 'youtimo',
    acl: 'public-read',
    key: function (req, file, cb) {
      let name = file.originalname.replace(/\s/g,'_');
      cb(null, name);
    }
  })
})

router.post('/',upload.array('image',5),function(req,res,next){
  try {
        if(req.files){
          let locations = []
          req.files.forEach(image => {
            locations.push(image.location);
          });
          req.body.img = locations;
        }
    next();
  } catch (error) {
    console.log(error)
    return res.status(501).json({message: `Error in uploading image ${error.message}`})
  }
})

module.exports = router;
