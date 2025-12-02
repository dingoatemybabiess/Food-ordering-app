
const express = require('express');
const router = express.Router();
const { getDailySales, getMonthlySales } = require('../controllers/sales.controller');

router.get('/daily', getDailySales);
router.get('/monthly', getMonthlySales);

module.exports = router;
