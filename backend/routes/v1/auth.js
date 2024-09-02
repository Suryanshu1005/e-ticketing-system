// /backend/routes/auth.js
const express = require("express");
const {register, login} = require("../../controllers/authController");
const {getUserProfile} = require("../../controllers/userController");
const authenticate = require("../../middleware/authenticate");
const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

//current user route
router.get("/me", authenticate, getUserProfile);
module.exports = router;
