const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// --- CORS CONFIGURATION ---
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://your-project-name.vercel.app' // YOUR ACTUAL VERCEL URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Simple Health Check Route for Render
app.get('/health', (req, res) => res.status(200).send('Server is running'));

// ... your routes (e.g., app.use('/api/v1', authRoutes))

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server live on port ${PORT}`)))
  .catch(err => console.error(err));