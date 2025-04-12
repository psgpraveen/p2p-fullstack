require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./utils/db'); 
const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = [
  'https://p2p-fullstack.vercel.app', // Frontend on Vercel
  'http://localhost:3000'             // Dev mode
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin: ' + origin));
    }
  },
  credentials: true,
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://p2p-fullstack.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


// Middleware
app.use(bodyParser.json({ limit: '10mb' }));

// Routes
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/books');

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

// Root
app.get('/', (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running ✅" });
});

// Start server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`✅ Server running at http://localhost:${PORT}`);
  } catch (err) {
    console.error('❌ Failed to connect to DB', err);
  }
});
