const jwt = require("jsonwebtoken");
const getToken = require("./getToken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized 2" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = checkToken;