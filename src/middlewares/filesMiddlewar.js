const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");
const path = require("path");

const uploadDir = path.resolve('./tmp');
const avatarDir = path.resolve('./public/avatars')

const avatarMiddleware = async (req, res, next) => {
  const { path: temporaryName, filename } = req.file;
  const [name, ext] = req.file.filename.split('.');
  await Jimp.read(`${uploadDir}/${filename}`)
    .then((image) => {
      return image
        .scaleToFit(250, 250)
        .quality(60)
        .write(`${avatarDir}/${name}-small.${ext}`);
    })
    .catch((err) => {
      console.error(err.message);
    });
  next();
}

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

module.exports = {uploadMiddleware, avatarMiddleware};