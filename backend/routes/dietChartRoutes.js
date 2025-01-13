const express = require('express');
const { 
    getDietCharts, 
    addDietChart, 
    updateDietChart, 
    deleteDietChart 
} = require('../controllers/dietChartController');

const router = express.Router();

router.get('/', getDietCharts);
router.post('/', addDietChart);
router.put('/:id', updateDietChart);
router.delete('/:id', deleteDietChart);

module.exports = router;
