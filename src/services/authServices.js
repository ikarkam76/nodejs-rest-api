const { User } = require('../models/userModel');

const register = async (req) => {
  const { email, password, subscription } = req.body;
    const user = new User({ email, password, subscription });
    await user.save();
};

const login = async (req) => {
    const { email, password } = req.body;
    console.log(email, password);
};


module.exports = { register, login };