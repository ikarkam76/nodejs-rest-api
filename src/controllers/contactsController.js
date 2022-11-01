const {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  changeContact,
  updateStatusContact,
} = require("../services/userServices.js");

const getContactsController = async (req, res, next) => {
  const response = await getContacts(req);
  res.status(200).json({ response });
};
const getContactByIdController = async (req, res, next) => {
  const response = await getContactById(req);
  res.status(200).json({ response });
};
const addContactController = async (req, res, next) => {
  const response = await addContact(req);
  res.status(201).json({response, message: "success! contact added!" });
};

const deleteContactController = async (req, res, next) => {
  await deleteContact(req);
  res.status(200).json({ message: "success! contact deleted" });
};

const changeContactController = async (req, res, next) => {
  const response = await changeContact(req);
  res.status(200).json({response, message: "success! contact updated!" });
};

const updateStatusContactController = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const response = await updateStatusContact(req);
  res.status(200).json({response, message: "success! status updated!" });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  updateStatusContactController
};
