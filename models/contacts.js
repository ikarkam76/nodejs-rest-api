const fs = require('fs').promises;
const path = require('path');
const {ObjectId} = require('mongodb');

const contactPath = path.resolve('models/contacts.json');
const {connectMongo} = require('../src/db/connection')

const listContacts = async () => {
  try {
    const { Users } = await connectMongo();
    const data = await Users.find({}).toArray();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const downloadNewList = (newList) => {
  fs.writeFile(contactPath, JSON.stringify(newList));
};

const getContactById = async (contactId) => {
  try {
    const { Users } = await connectMongo();
    const data = await Users.findOne({_id: new ObjectId(contactId)});
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const newList = await data.filter((item) => item.id !== contactId);
    downloadNewList(newList);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async ({name, email, phone}) => {
  try {
    const data = await listContacts();
    const newContact = await {
      id: Date.now().toString(),
      name: name,
      email: email,
      phone: phone,
    };
    const newList = await [...data, newContact];
    downloadNewList(newList);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  const {name, email, phone} = body;
  const newList = [];
  try {
    const data = await listContacts();
    await data.forEach((item) => {
      if (item.id === contactId) {
        item.name = name;
        item.email = email;
        item.phone = phone;
      }
      newList.push(item);
    });
    downloadNewList(newList);
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
};
