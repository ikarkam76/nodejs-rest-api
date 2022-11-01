const Joi = require('joi');

module.exports = {
  validationContact: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      favorite: Joi.boolean(),
    }).with("name", "name");
    const {error} = schema.validate(req.body);
    if (error) {
      return res.status(400).json({message: error.details});
    }
    next();
  },
};
