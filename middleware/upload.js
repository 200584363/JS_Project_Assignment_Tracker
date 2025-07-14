// Import multer for handling file uploads and path for working with file paths
const multer = require('multer');
const path = require('path');

// Configure storage settings for multer
const storage = multer.diskStorage({

  // Set the destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); 
  },

  // Set the filename format for uploaded files
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension (e.g., .jpg, .png)

    // Create a unique filename using the field name and current timestamp
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage });

module.exports = upload;
