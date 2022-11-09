const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  currentController,
} = require("../controllers/authController");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { validationUser } = require("../middlewares/validationMiddleware");
const authMiddlewar = require("../middlewares/auth");

const authRouter = new express.Router();

authRouter.post("/register", validationUser, asyncWrapper(registerController));
authRouter.get("/login", validationUser, asyncWrapper(loginController));
authRouter.post('/logout', authMiddlewar, asyncWrapper(logoutController));
authRouter.get("/current", authMiddlewar, asyncWrapper(currentController));

module.exports = authRouter;