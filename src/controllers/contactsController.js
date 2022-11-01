const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts.js');

const getContacts = async (req, res, next) => {
    const response = await listContacts(req);
    res.status(200).json({response});
};
const getOneContactById = async (req, res, next) => {
    const response = await getContactById(req);
    res.status(200).json({ response });
};
const addNewContact = async (req, res, next) => {
    await addContact(req);
    res.status(201).json({message:'success! contact added!'});
};

const deleteContact = async (req, res, next) => {
    await removeContact(req);
    res.status(200).json({ message: "success! contact deleted" });
};

const changeContact = async (req, res, next) => {
    await updateContact(req);
    res.status(200).json({ message: "success! contact updated!" });
};

module.exports = {
  getContacts,
  getOneContactById,
  addNewContact,
  deleteContact,
  changeContact,
};
