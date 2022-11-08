const Joi = require("joi");
const { Contact } = require("../models/contactModel");

module.exports = {
  validationContact: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    }).with("name", "name");
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details });
    }
    next();
  },
  validationId: async (req, res, next) => {
    const data = await Contact.findById(req.params.contactId);
    if (data === null) {
      return res.status(404).json({ message: "contact not found" });
    }
    next();
  },
};
