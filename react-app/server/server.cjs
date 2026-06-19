const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/products', require('./routes/products'))
app.use('/api/users', require('./routes/users'))
app.use('/api/transactions', require('./routes/transactions'))

// Health check
app.get('/api', (req, res) => {
  res.json({ message: '🚀 FinTrack API is running' })
})

// Start server
const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
})
