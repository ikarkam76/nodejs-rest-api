const express = require("express");
const path = require("path");

const { asyncWrapper } = require("../helpers/apiHelpers");
const { uploadController, downloadController } = require("../controllers/filesController");
const { uploadMiddleware } = require("../middlewares/filesMiddlewar");

const PUBLIC_DIR = path.resolve("./public");

const filesRouter = new express.Router();

filesRouter.post("/upload", uploadMiddleware.single('avatar'), asyncWrapper(uploadController));
filesRouter.use("/download", express.static(PUBLIC_DIR));

module.exports = filesRouter;
