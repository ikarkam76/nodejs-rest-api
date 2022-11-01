const { User } = require("../db/userModel");

const getContacts = async (req) => {
  const data = await User.find({});
  return data;
};

const getContactById = async (req) => {
  const data = await User.findById(req.params.contactId);
  return data;
};

const addContact = async (req) => {
  const { name, email, phone, favorite } = req.body;
  const user = new User({ name, email, phone, favorite });
  await user.save();
};

const changeContact = async (req) => {
  const { name, email, phone, favorite } = req.body;
  await User.findByIdAndUpdate(req.params.contactId, {
    $set: { name, email, phone, favorite },
  });
};

const deleteContact = async (req) => {
  await User.findByIdAndRemove(req.params.contactId);
};

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  changeContact,
};
