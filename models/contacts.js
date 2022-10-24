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
    const data = await fs.readFile(contactPath, "utf-8");
    return JSON.parse(data).filter((item) => item.id === contactId);
  } catch (error) {
    console.log(error.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const newList = await JSON.parse(data).filter((item) => item.id !== contactId);
    fs.writeFile(contactPath, JSON.stringify(newList));
  } catch (error) {
    console.log(error.message);
  }
}

const addContact = async ({name, email, phone}) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const newContact = await {
      id: Date.now().toString(),
      name: name,
      email: email,
      phone: phone,
    };
    const newList = await [...JSON.parse(data), newContact];
    fs.writeFile(contactPath, JSON.stringify(newList));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const newList = [];
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    await JSON.parse(data).forEach((item) => {
      if (item.id === contactId) {
        item.name = name;
        item.email = email;
        item.phone = phone;
      }
      newList.push(item);
    });
    fs.writeFile(contactPath, JSON.stringify(newList));
    return newList.filter((item) => item.id === contactId);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
