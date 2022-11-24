const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  currentController,
  updateSubscriptionController,
  updateAvatarController,
} = require("../controllers/authController");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { validation } = require("../middlewares/validationMiddleware");
const authMiddlewar = require("../middlewares/auth");
const { uploadMiddleware } = require("../middlewares/filesMiddlewar");
const { verifyEmail, repeatVerifycationEmail } = require("../services/verifyEmailServices");

const authRouter = new express.Router();

authRouter.post("/register", validation, asyncWrapper(registerController));
authRouter.get("/login", validation, asyncWrapper(loginController));
authRouter.post('/logout', authMiddlewar, asyncWrapper(logoutController));
authRouter.get("/current", authMiddlewar, asyncWrapper(currentController));
authRouter.patch("/", authMiddlewar, validation, asyncWrapper(updateSubscriptionController));
authRouter.patch(
  "/avatar",
  authMiddlewar,
  uploadMiddleware.single("avatar"),
  asyncWrapper(updateAvatarController)
);
authRouter.get("/verify/:verificationToken", asyncWrapper(verifyEmail));
authRouter.post('/verify',validation, asyncWrapper(repeatVerifycationEmail))
module.exports = authRouter;