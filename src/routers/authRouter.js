const express = require("express");
const {registerController, loginController} = require('../controllers/authController');
const { asyncWrapper } = require("../helpers/apiHelpers");
const {} = require("../middlewares/validationMiddleware");

const authRouter = new express.Router();

authRouter.post("/register", asyncWrapper(registerController));
authRouter.get('/login', asyncWrapper(loginController));

module.exports = authRouter;