const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "no token authorization denied" });
  }

  try {
    const decodedUser = jwt.verify(token, config.get("secret"));
    req.user = decodedUser.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token authorization denied" });
  }
};
