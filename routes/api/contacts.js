const express = require('express');
const {listContacts, getContactById, removeContact, addContact, updateContact} = require("../../models/contacts.js");


const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const response = await listContacts();
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const response = await getContactById(req.params.contactId);
        if (!response[0]) {
          return res.status(404).json({ message: "Not found!" });
        }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post('/', async (req, res, next) => {
  try {
    const response = await addContact(req.body);
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    await removeContact(req.params.contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const response = await updateContact(req.params.contactId, req.body);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router
