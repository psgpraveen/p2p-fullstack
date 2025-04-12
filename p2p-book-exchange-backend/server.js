require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./utils/db'); 
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // You can change '10mb' to any size you prefer

app.get('/', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running ✅"
  });
});
// Routes
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/books');

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);



// Start server

app.listen(PORT, async () => {
  try {
    await connectDB(); // ⬅️ Ensure DB connection before starting
    console.log(`✅ Server running at http://localhost:${PORT}`);
  } catch (err) {
    console.error('❌ Failed to connect to DB', err);
  }
});
