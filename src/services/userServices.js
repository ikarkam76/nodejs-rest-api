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
  return user;
};

const changeContact = async (req) => {
  const { name, email, phone, favorite } = req.body;
  const data = await User.findByIdAndUpdate(
    req.params.contactId,
    {
      $set: { name, email, phone, favorite },
    },
    { returnDocument: "after" });
  return data;
};

const deleteContact = async (req) => {
  await User.findByIdAndRemove(req.params.contactId);
};

const updateStatusContact = async (req) => {
  const data = await User.findByIdAndUpdate(
    req.params.contactId,
    {
      $set: { favorite: req.body.favorite },
    },
    { returnDocument: "after" }
  );
  return data;
};

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  changeContact,
  updateStatusContact,
};
