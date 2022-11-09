const express = require("express");
const {registerController, loginController} = require('../controllers/authController');
const { asyncWrapper } = require("../helpers/apiHelpers");
const {validationUser} = require("../middlewares/validationMiddleware");

const authRouter = new express.Router();

authRouter.post("/register", validationUser, asyncWrapper(registerController));
authRouter.get("/login", validationUser, asyncWrapper(loginController));

module.exports = authRouter;