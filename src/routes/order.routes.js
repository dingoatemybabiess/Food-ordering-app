const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Order routes working');
});
const orderController = require('../controllers/order.controller');
router.post('/', orderController.createOrder);

module.exports = router;