const express = require('express');
const {
  getContacts,
  getOneContactById,
  addNewContact,
  deleteContact,
  changeContact,
} = require('../controllers/contactsController');
const { asyncWrapper } = require('../helpers/apiHelpers');
const {collectionsMiddlewear} = require('../middlewares/collectionsMiddlewear');
const {
  validationContact,
  } = require('../middlewares/validationMiddleware');

const router = new express.Router();

router.use(collectionsMiddlewear);

router.get("/", asyncWrapper(getContacts));
router.get("/:contactId", asyncWrapper(getOneContactById));
router.post("/", validationContact, asyncWrapper(addNewContact));
router.delete("/:contactId", asyncWrapper(deleteContact));
router.put("/:contactId", validationContact, asyncWrapper(changeContact));
module.exports = router;
