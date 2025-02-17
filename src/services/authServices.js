const fs = require("fs").promises;
const Jimp = require("jimp");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const uploadDir = path.resolve("./tmp");
const avatarDir = path.resolve("./public");
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const {sendVerificationEmail} = require('../services/verifyEmailServices')

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const token = uuidv4();
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const url = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "monsterid",
  });
  const user = new User({
    email,
    password: hashedPassword,
    subscription,
    avatarURL: url,
    verificationToken: token,
  });
  try {
    await user.save();
    await sendVerificationEmail({ email, token });
    return res.status(201).json({ message: "User created. Verify code send to your email.", user: user });
  } catch (error) {
    if (error.message.includes("duplicate key")) {
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
  if (!user.verify) {
    return res
      .status(401)
      .json({ message: "You must be verified. Check your mail." });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Wrong password!" });
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
      subscription: response.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { $set: { token: null } });
  res.status(204).json({});
};

const current = async (req, res) => {
  res
    .status(200)
    .json({ email: req.user.email, subscription: req.user.subscription });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const response = await User.findByIdAndUpdate(
    _id,
    { $set: { subscription } },
    { returnDocument: "after" }
  );
  res.status(200).json(response);
};

const updateAvatar = async (req, res) => {
    const { path: temporaryName, filename } = req.file;
    const { _id } = req.user;
  const [name, ext] = req.file.filename.split(".");
  await Jimp.read(`${uploadDir}/${filename}`)
    .then((image) => {
      return image
        .scaleToFit(250, 250)
        .quality(60)
        .write(`${uploadDir}/${name}.${ext}`);
    })
    .catch((err) => {
      console.error(err.message);
    });
  const fileName = path.join(`${avatarDir}/avatars`, filename);
  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
    }
    const response = await User.findByIdAndUpdate(
      _id,
      { $set: { avatarURL: `${avatarDir}/avatars/${name}.${ext}` } },
      { returnDocument: "after" }
    );
  const { avatarURL } = response;
  res.status(200).json({ avatarURL, message: "Avatar uploated!" });
};

module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
};
