const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/diet-charts', require('./routes/dietChartRoutes'));
app.use('/api/deliveries', require('./routes/deliveryRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
