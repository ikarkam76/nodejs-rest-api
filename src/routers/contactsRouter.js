const express = require('express');
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  updateStatusContactController,
} = require("../controllers/contactsController");
const { asyncWrapper } = require('../helpers/apiHelpers');
const {
  validationContact,
  validationFavorite,
} = require("../middlewares/validationMiddleware");
  const authMiddlewar = require('../middlewares/auth')

const contactsRouter = new express.Router();

contactsRouter.get("/",authMiddlewar,validationFavorite, asyncWrapper(getContactsController));
contactsRouter.get("/:contactId",authMiddlewar, asyncWrapper(getContactByIdController));
contactsRouter.post("/", authMiddlewar, validationContact, asyncWrapper(addContactController));
contactsRouter.delete("/:contactId", authMiddlewar, asyncWrapper(deleteContactController));
contactsRouter.put(
  "/:contactId",
  authMiddlewar,
  validationContact,
  asyncWrapper(changeContactController)
);
contactsRouter.patch(
  "/:contactId/favorite",
  authMiddlewar,
  asyncWrapper(updateStatusContactController)
);

module.exports = contactsRouter;