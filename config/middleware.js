const multerS3 = require('multer-s3');
const multer = require('multer');
const aws = require('aws-sdk');
const express = require('express');
const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: 'AKIAQIZF5O6IRJ5DY3UL',
  secretAccessKey: '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'
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
    bucket: 'grocerskart',
    acl: 'public-read',
    key: function (req, file, cb) {
      const name = file.originalname.replace(/\s/g,'_');
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
    return res.status(501).json({message: 'Error in uploading image'})
  }
})

module.exports = router;