const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = process.env;

const register = async (req, res) => {
    const { email, password, subscription } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, password:hashedPassword, subscription });
    try {
        await user.save();
        return user;
    } catch (error) {
        if (error.message.includes('duplicate key')) {
            return res.status(409).json({ message: "Email in use" });
        }
        throw error;
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res
          .status(401)
          .json({ message: "Don`t excist user with this email!" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({message: "Wrong password!"})
    }
    const newToken = jwt.sign({ _id: user._id }, JWT_SECRET);
    const response = await User.findByIdAndUpdate(
      user._id,
      { $set: { token: newToken } },
      { returnDocument: "after" }
    );
    res.status(200).json({
        token: response.token,
        user: {
            email: response.email,
            subscription: response.subscription
        }
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(
      _id,
      { $set: { token: '' } }
    );
    res.status(204).json({});
};

const current = async (req, res) => {
  res.json(req.user); //TODO add logik
};

module.exports = { register, login, logout, current };