const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');

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
    const token = "tokengood";
    res.status(200).json({ data: token });
};


module.exports = { register, login };