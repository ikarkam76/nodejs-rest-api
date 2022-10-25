const express = require('express');
const {
  getContacts,
  getOneContactById,
  addNewContact,
  deleteContact,
  changeContact
} = require('../../controllers/contactsController');
const { validationContact, validationId } = require('../../middlewares/validationMiddleware');

const router = new express.Router();

router.get('/', getContacts);
router.get('/:contactId', validationId, getOneContactById);
router.post('/', validationContact, addNewContact);
router.delete('/:contactId', validationId, deleteContact);
router.put('/:contactId', validationId, validationContact, changeContact);
module.exports = router;