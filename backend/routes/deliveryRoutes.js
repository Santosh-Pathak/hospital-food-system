const express = require('express');
const { 
    getDeliveries, 
    addDelivery, 
    updateDeliveryStatus 
} = require('../controllers/deliveryController');

const router = express.Router();

router.get('/', getDeliveries);
router.post('/', addDelivery);
router.put('/:id', updateDeliveryStatus);

module.exports = router;
