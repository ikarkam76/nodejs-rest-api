const jwt = require('jsonwebtoken');
const { User } = require("../models/userModel");

const {JWT_SECRET} = process.env;

const authMiddlewar = async (req, res, next) => {
    const { authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== 'Bearer') {
        res.status(401).json({ message: "Not authorized token" });
    }
        try {
            const { _id } = await jwt.verify(token, JWT_SECRET);
            const user = await User.findById(_id);
            if (!user) {
                res.status(401).json({ message: "Not authorized user" });
            }
            req.user = user;
            next();
        } catch (error) {
            if (error.message === "Invalide signature") {
                res.status(401).json({ message: "Not authorized" });
            }
            throw error;
        }

}

module.exports = authMiddlewar;