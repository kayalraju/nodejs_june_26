const multer = require("multer");
//what is the usecase of multer
//multer is used to handle file uploads
//multer is used to handle form data
//multer is used to handle multipart/form-data

// Store file in memory instead of local disk (why - because I want to upload file to cloudinary directly without saving it to local disk)
//benefit - reduce disk I/O operations, fast processing, no need to delete file from local disk after upload
const storage = multer.memoryStorage();

// Allow only image files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only JPG, JPEG, PNG, WEBP, and GIF images are allowed."),
      false,
    );
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    
  },
});

module.exports = upload;