const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const {User} = require('../models/userModel')

const { SENDGRID_API_KEY, PORT } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerificationEmail = async ({ email, token }) => {
    const url = `localhost:${PORT}/api/users/verify/${token}`;
    const msg = {
      to: email,
      from: "ikarkam76@meta.ua",
      subject: "Please verify your email",
      text: `Open this link ${url}`,
      html: `<strong>Open this link ${url}</strong>`,
    };
    await sgMail.send(msg)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error.message);
        });
}

const verifyEmail = async (req, res, next) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken: verificationToken });
    if (!user) { return res.status(404).json({ message: "Not found!" }) };
    if (!user.verify) {
        await User.findByIdAndUpdate(user._id, { verify: true });
        return res.status(200).json({ message: "Verification successful" });
    };
    if (user.verify) { return res.status(400).json({message: "Verification has already been passed"})}
}

const repeatVerifycationEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "Not found!" });
    }
    if (user.verify) {
        return res
          .status(400)
          .json({ message: "Verification has already been passed" });
    }
    if (!user.verify) {
        sendVerificationEmail({ email: user.email, token: user.verificationToken });
        return res
          .status(200)
          .json({ message: "Verification code sent to your mail" });
    }
};

module.exports = {sendVerificationEmail, verifyEmail, repeatVerifycationEmail};