const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const uploadDir = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const [_, extention] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extention}`);
  },
  limits: {
    fileSize: 1048576,
  },
});

const uploadMiddleware = multer({ storage });

module.exports = { uploadMiddleware };
