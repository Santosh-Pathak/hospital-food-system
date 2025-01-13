const Delivery = require('../models/Delivery');

// Get all deliveries
const getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find().populate('patientId', 'name roomNumber bedNumber');
        res.json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a delivery
const addDelivery = async (req, res) => {
    try {
        const newDelivery = new Delivery(req.body);
        const savedDelivery = await newDelivery.save();
        res.status(201).json(savedDelivery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update delivery status
const updateDeliveryStatus = async (req, res) => {
    try {
        const updatedDelivery = await Delivery.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status, notes: req.body.notes }, 
            { new: true }
        );
        res.json(updatedDelivery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getDeliveries, addDelivery, updateDeliveryStatus };
