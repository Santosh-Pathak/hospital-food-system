const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Delivered'], default: 'Pending' },
    timestamps: { type: Date, default: Date.now },
    notes: String,
});

module.exports = mongoose.model('Delivery', DeliverySchema);
