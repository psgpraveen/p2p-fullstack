// api/index.js
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('../utils/db');
const userRoutes = require('../routes/user');
const bookRoutes = require('../routes/books');

// Init Express App
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Serverless API running ✅' });
});
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
