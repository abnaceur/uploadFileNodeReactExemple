var express = require('express');
var router = express.Router();
const multer = require('multer');


/**
 * Multer filter the uplaod file via [POST] and/or [GET] request
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
      // Rename the uplaoded file
      cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Define the extension of the file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
      cb(null, true);
  else
      cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: {
      fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/upload', upload.any(), function(req, res, next) {
  console.log("UPLOAD FILE EXAMPLE");
  console.log("FILE SAVED IN UPLOAD FOLDER")
  res.send('respond with a resource');
});

module.exports = router;