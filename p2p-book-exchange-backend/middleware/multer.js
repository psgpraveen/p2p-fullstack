const multer = require('multer');
const path = require('path');

// Set destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // temp storage folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Only accept image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
