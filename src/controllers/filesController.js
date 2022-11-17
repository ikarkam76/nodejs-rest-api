const path = require('path');

const PUBLIC_DIR = path.resolve('./public');

const uploadController = async (req, res, next) => {
    res.status(200).json({message: 'File uploaded!'})
};

const downloadController = async (req, res, next) => {
  
};

module.exports = {
  uploadController,
  downloadController,
};
