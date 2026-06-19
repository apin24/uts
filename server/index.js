const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected to Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('FinTrack Pro API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
