const { register, login } = require('../services/authServices');

const registerController = async (req, res, next) => {
    const response = await register(req, res);
    const { email, password, subscription } = response;
    res.status(201).json({ email , password, subscription, message:'User created!' });
}

const loginController = async (req, res, next) => {
    const response = await login(req, res);
    res.status(200).json({ response });
}

module.exports = { registerController, loginController };