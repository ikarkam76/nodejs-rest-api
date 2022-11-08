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
  validationContact, validationId,
  } = require('../middlewares/validationMiddleware');

const contactsRouter = new express.Router();

contactsRouter.get("/", asyncWrapper(getContactsController));
contactsRouter.get("/:contactId",validationId, asyncWrapper(getContactByIdController));
contactsRouter.post("/", validationContact, asyncWrapper(addContactController));
contactsRouter.delete("/:contactId",validationId, asyncWrapper(deleteContactController));
contactsRouter.put(
  "/:contactId",
  validationId,
  validationContact,
  asyncWrapper(changeContactController)
);
contactsRouter.patch(
  "/:contactId/favorite",
  validationId,
  asyncWrapper(updateStatusContactController)
);

module.exports = contactsRouter;