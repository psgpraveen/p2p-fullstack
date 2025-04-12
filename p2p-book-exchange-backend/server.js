const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Import routes
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/books');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.get('/', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "User route is healthy ✅"
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
