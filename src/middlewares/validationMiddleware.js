const Joi = require("joi");

module.exports = {
  validation: (req, res, next) => {
    const validationSchema = Joi.object({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
      password: Joi.string().min(6),
      phone: Joi.string(),
      favorite: Joi.boolean().valid("true", "false"),
      subscription: Joi.string().valid("pro", "starter", "business"),
      verificationToken: Joi.string(),
    }).with("name", "name");
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details });
    }
    next();
  },
};
