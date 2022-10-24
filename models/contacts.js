const fs = require('fs').promises;
const path = require('path');

const contactPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

const getContactById = async (contactId) => {
  try {
    console.log(contactId);
    const data = await fs.readFile(contactPath, "utf-8");
    return JSON.parse(data).filter((item) => item.id === contactId);    
  } catch (error) {
    console.log(error.message);
  }
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
