const express = require('express'),
      app = express(),
      db = require('./config/db'),
      cors = require('cors'),
      weatherRoutes = require('./routes/weatherRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for cors policy
app.use(cors());

// weather routes
app.use('/api/weather', weatherRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
