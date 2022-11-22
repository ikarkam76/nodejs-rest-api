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
const {
  validationUser,
  validationSubscription,
  validationEmail,
} = require("../middlewares/validationMiddleware");
const authMiddlewar = require("../middlewares/auth");
const { uploadMiddleware } = require("../middlewares/filesMiddlewar");
const { verifyEmail, repeatVerifycationEmail } = require("../services/verifyEmailServices");

const authRouter = new express.Router();

authRouter.post("/register", validationUser, asyncWrapper(registerController));
authRouter.get("/login", validationUser, asyncWrapper(loginController));
authRouter.post('/logout', authMiddlewar, asyncWrapper(logoutController));
authRouter.get("/current", authMiddlewar, asyncWrapper(currentController));
authRouter.patch("/", authMiddlewar, validationSubscription, asyncWrapper(updateSubscriptionController));
authRouter.patch(
  "/avatar",
  authMiddlewar,
  uploadMiddleware.single("avatar"),
  asyncWrapper(updateAvatarController)
);
authRouter.get("/verify/:verificationToken", asyncWrapper(verifyEmail));
authRouter.post('/verify',validationEmail, asyncWrapper(repeatVerifycationEmail))
module.exports = authRouter;