const { User } = require('../models/userModel');

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
    const user = new User({ email, password, subscription });
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

const login = async (req) => {
    const { email, password } = req.body;
};


module.exports = { register, login };