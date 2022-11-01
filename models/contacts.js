const fs = require('fs').promises;
const path = require('path');
const {ObjectId} = require('mongodb');

const contactPath = path.resolve('models/contacts.json');

const listContacts = async (req) => {
  try {
    const data = await req.db.Users.find({}).toArray();
    return data;
  } catch (error) {
    console.log(error.message);
  };
};

const getContactById = async (req) => {
  try {
    const data = await req.db.Users.findOne({
      _id: new ObjectId(req.params.contactId),
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (req) => {
  try {
    const { name, email, phone, favorite } = req.body;
    await req.db.Users.insertOne({ name, email, phone, favorite });
      } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (req) => {
  const { name, email, phone, favorite } = req.body;
  try {
    await req.db.Users.updateOne(
      { _id: new ObjectId(req.params.contactId) },
      { $set: { name, email, phone, favorite } }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (req) => {
  try {
    await req.db.Users.deleteOne({
      _id: new ObjectId(req.params.contactId),
    });
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
