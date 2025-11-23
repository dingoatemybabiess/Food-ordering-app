const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

// Example of protected route
router.get(
  "/profile",
  authMiddleware.authenticateToken,
  authController.getProfile
);

module.exports = router;
