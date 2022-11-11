const { register, login, logout, current, updateSubscription } = require('../services/authServices');

const registerController = async (req, res, next) => {
    const response = await register(req, res);
    const { email, password, subscription, avatarURL } = response;
    res
      .status(201)
      .json(
        { email, password, subscription, avatarURL ,
         message: "User created!" }
      );
}

const loginController = async (req, res, next) => {
    const response = await login(req, res);
    res.status(200).json({ response });
}

const logoutController = async (req, res, next) => {
    await logout(req, res);
    res.status(204);
};

const currentController = async (req, res, next) => {
  const response = await current(req, res);
  res.status(200).json({ response });
};

const updateSubscriptionController =  async (req, res, next) => {
    const response = await updateSubscription(req, res);
    res.status(200).json({ response });
}

const updateAvatarController = async (req, res, next) => {
const file = req.file;
const user = req.user;
res.status(200).json({ file, user, message: "Avatar uploated!" });};

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentController,
  updateSubscriptionController,
  updateAvatarController,
};