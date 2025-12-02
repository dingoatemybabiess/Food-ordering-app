const express = require('express');
const router = express.Router();
const { getItemRatings } = require('../controllers/review.controller');

router.get('/ratings', getItemRatings);

module.exports = router;