const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Test route
router.get("/", (req, res) => {
  res.send("User routes working");
});

// Update user profile
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  userController.updateUser
);

module.exports = router;
