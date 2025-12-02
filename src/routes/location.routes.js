const express = require('express');
const { addLocation } = require('../controllers/location.controller');
const { authenticateToken } = require('../middleware/auth.middleware'); // import middleware
const router = express.Router();

// Protect the route with JWT
router.post('/add', authenticateToken, addLocation);

module.exports = router;
