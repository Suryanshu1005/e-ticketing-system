// /backend/controllers/authController.js
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registers a new user.
async function register(req, res, next) {
  const {username, email, password} = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({where: {email}});
    if (existingUser) {
      return res.status(400).json({error: "Email already in use"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({username, email, password: hashedPassword});
    const token = jwt.sign(
      {id: user.id},
      process.env.JWT_SECRET || "your_jwt_secret",
      {expiresIn: "1h"}
    );

    res.status(201).json({
      token,
      user: {id: user.id, username: user.username, email: user.email},
    });
  } catch (error) {
    next(error);
  }
}

// Logs in an existing user.
async function login(req, res, next) {
  const {email, password} = req.body;

  try {
    // Logic to find the user using the email
    const user = await User.findOne({where: {email}});
    if (!user) {
      return res.status(400).json({error: "Invalid credentials"});
    }

    // Matching the entered password with the hased password stored in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({error: "Invalid credentials"});
    }

    // Generate token
    const token = jwt.sign(
      {id: user.id},
      process.env.JWT_SECRET || "your_jwt_secret",
      {expiresIn: "1h"}
    );

    res.json({
      token,
      user: {id: user.id, username: user.username, email: user.email},
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
};
