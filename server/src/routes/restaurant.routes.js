const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

router.post('/create', restaurantController.createRestaurant);

router.get('/', restaurantController.getAllRestaurants);

router.get('/:id/items', restaurantController.getRestaurantItems);

module.exports = router;
