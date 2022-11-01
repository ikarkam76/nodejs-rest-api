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

const router = new express.Router();

router.get("/", asyncWrapper(getContactsController));
router.get("/:contactId",validationId, asyncWrapper(getContactByIdController));
router.post("/", validationContact, asyncWrapper(addContactController));
router.delete("/:contactId",validationId, asyncWrapper(deleteContactController));
router.put(
  "/:contactId",
  validationId,
  validationContact,
  asyncWrapper(changeContactController)
);
router.patch(
  "/:contactId/favorite",
  validationId,
  asyncWrapper(updateStatusContactController)
);

module.exports = router;