const { register, login } = require('../services/authServices');

const registerController = async (req, res, next) => {
    const response = await register(req);
    res.status(200).json({ response });
}

const loginController = async (req, res, next) => {
    const response = await login(req);
    res.status(200).json({ response });
}

module.exports = { registerController, loginController };