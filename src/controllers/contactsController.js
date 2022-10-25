const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts.js');

const getContacts = async (req, res, next) => {
  try {
    const response = await listContacts();
    res.status(200).json({response});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
const getOneContactById = async (req, res, next) => {
  try {
    const response = await getContactById(req.params.contactId);
    res.status(200).json({response});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
const addNewContact = async (req, res, next) => {
  try {
    const response = await addContact(req.body);
    res.status(201).json({response});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
const deleteContact = async (req, res, next) => {
  try {
    await removeContact(req.params.contactId);
    res.status(200).json({message: 'contact deleted'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
const changeContact = async (req, res, next) => {
  try {
    const response = await updateContact(req.params.contactId, req.body);
    res.status(200).json({response});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  getContacts,
  getOneContactById,
  addNewContact,
  deleteContact,
  changeContact,
};
