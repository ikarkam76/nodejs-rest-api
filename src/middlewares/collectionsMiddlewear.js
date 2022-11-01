const { getCollections } = require("../db/connection")

module.exports = {
  collectionsMiddlewear: (req, res, next) => {
    const collections = getCollections();
    req.db = { ...collections };
    next();
  },
};