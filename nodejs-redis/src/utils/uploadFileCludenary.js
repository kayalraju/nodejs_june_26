const cloudinary = require("../config/cludenary.config");
const streamifier = require("streamifier");
//what is the usecase of streamifier?
//streamifier is used to convert a buffer to a stream
//buffer is a binary data format
//stream is used to handle large data in chunks
//buffer is used to store the file in memory
//stream is used to process the file in chunks
//why streamifier - because I stored the file in memory using multer.memoryStorage()
//if I used multer.diskStorage(), then I would not need streamifier

const uploadFileCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream( 
      {
        folder: `${process.env.CLOUDINARY_FOLDER}/${folder}`,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = uploadFileCloudinary;