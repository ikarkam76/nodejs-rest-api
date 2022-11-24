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
const { validation } = require("../middlewares/validationMiddleware");
const authMiddlewar = require('../middlewares/auth')

const contactsRouter = new express.Router();

contactsRouter.get("/",authMiddlewar,validation, asyncWrapper(getContactsController));
contactsRouter.get("/:contactId",authMiddlewar, asyncWrapper(getContactByIdController));
contactsRouter.post("/", authMiddlewar, validation, asyncWrapper(addContactController));
contactsRouter.delete("/:contactId", authMiddlewar, asyncWrapper(deleteContactController));
contactsRouter.put(
  "/:contactId",
  authMiddlewar,
  validation,
  asyncWrapper(changeContactController)
);
contactsRouter.patch(
  "/:contactId/favorite",
  authMiddlewar,
  asyncWrapper(updateStatusContactController)
);

module.exports = contactsRouter;