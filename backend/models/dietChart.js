const mongoose = require('mongoose');

const DietChartSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    meals: {
        morning: { ingredients: [String], instructions: String },
        evening: { ingredients: [String], instructions: String },
        night: { ingredients: [String], instructions: String },
    },
});

module.exports = mongoose.model('DietChart', DietChartSchema);
