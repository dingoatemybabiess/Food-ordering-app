const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Order routes working');
});
const orderController = require('../controllers/order.controller'); //task 4 added route
router.post('/', orderController.createOrder); //task 4 added route

module.exports = router;