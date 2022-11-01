const Joi = require('joi');
const {getContactById} = require('../../models/contacts');

module.exports = {
  validationContact: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
          .min(2)
          .max(30)
          .required(),
      email: Joi.string()
          .email()
          .required(),
      phone: Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .required(),
    }).with('name', 'name');
    const {error} = schema.validate(req.body);
    if (error) {
      return res.status(400).json({message: error.details});
    }
    next();
  },
  validationId: async (req, res, next) => {
    const data = await getContactById(req.params.contactId);
    if (!data) {
      return res.status(404).json({message: 'Not found!'});
    };
    next();
  },
};
