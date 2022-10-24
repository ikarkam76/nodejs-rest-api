const express = require('express');
const {listContacts, getContactById} = require("../../models/contacts.js");


const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const response = await listContacts();
    res.json({ response, status:'success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const response = await getContactById(req.params.contactId);
    res.json({ response, status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message post' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message delete' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message put' })
})

module.exports = router
