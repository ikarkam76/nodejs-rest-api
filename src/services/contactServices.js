const { Contact } = require("../models/contactModel");

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.find({owner: _id}, '', {skip, limit}).populate('owner', 'email');
  return data;
};

const getContactById = async (req) => {
  const data = await Contact.findById(req.params.contactId);
  return data;
};

const addContact = async (req) => {
  const { name, email, phone, favorite } = req.body;
  const { _id } = req.user;
  const contact = new Contact({ name, email, phone, favorite, owner: _id});
  await contact.save();
  return contact;
};

const changeContact = async (req) => {
  const { name, email, phone, favorite } = req.body;
  const data = await Contact.findByIdAndUpdate(
    req.params.contactId,
    {
      $set: { name, email, phone, favorite },
    },
    { returnDocument: "after" });
  return data;
};

const deleteContact = async (req) => {
  await Contact.findByIdAndRemove(req.params.contactId);
};

const updateStatusContact = async (req) => {
  const data = await Contact.findByIdAndUpdate(
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
