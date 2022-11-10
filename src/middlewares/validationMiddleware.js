const Joi = require("joi");
const { Contact } = require("../models/contactModel");

module.exports = {
  validationContact: (req, res, next) => {
    const contactSchema = Joi.object({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    }).with("name", "name");
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details });
    }
    next();
  },
  validationSubscription: async (req, res, next) => {
    const subSchema = Joi.string().valid("pro", "starter", "business");
    const { error } = subSchema.validate(req.body.subscription);
    if (error) {
      return res.status(400).json({ message: error.details });
    }
    next();
  },
  validationFavorite: async (req, res, next) => {
    const favSchema = Joi.string().valid('true', 'false');
    const { error } = favSchema.validate(req.query.favorite);
    if (error) {
      return res.status(400).json({ message: error.details });
    }
    next();
  },
  validationUser: (req, res, next) => {
    const userSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      subscription: Joi.string()
    });
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details });
    }
    next();
  }
};
