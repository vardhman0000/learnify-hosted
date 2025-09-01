const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./src/routes/authRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const lectureRoutes = require('./src/routes/lectureRoutes');

const app = express();

// A more robust CORS setup for production and development
const allowedOrigins = [
  'https://learnify-hosted-frontend.onrender.com',
  'http://localhost:5173' // Assuming your local Vite client runs on this port
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests) or from whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lectures', lectureRoutes);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Server is running and MongoDB is connected!');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
