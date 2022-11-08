const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\(\d{3}\)\d{3}-\d{4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "Contact phone number required"],
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
  // owner: {
  //   type: SchemaTypes.ObjectId,
  //   ref: "users",
  // },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = { Contact };