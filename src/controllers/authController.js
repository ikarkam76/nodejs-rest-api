const { register, login } = require('../services/authServices');

const registerController = async (req, res, next) => {
    const response = await register(req, res);
    const { email, subscription } = response;
    res.status(201).json({ email , subscription, message:'User created!' });
}

const loginController = async (req, res, next) => {
    const response = await login(req);
    res.status(200).json({ response });
}

module.exports = { registerController, loginController };