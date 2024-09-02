const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({error: "Authentication token missing or invalid"});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({error: "User not found"});
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({error: "Token is not valid"});
  }
};

module.exports = authenticate;
