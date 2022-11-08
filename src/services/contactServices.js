const { Contact } = require("../models/contactModel");

const getContacts = async (req) => {
  const data = await Contact.find({});
  return data;
};

const getContactById = async (req) => {
  const data = await Contact.findById(req.params.contactId);
  return data;
};

const addContact = async (req) => {
  const { name, email, phone, favorite } = req.body;
  const contact = new Contact({ name, email, phone, favorite });
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
