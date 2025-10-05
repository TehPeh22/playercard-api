const express = require('express')
const cors = require('cors')
require('dotenv').config()
const db = require('./config/database')

// Com between front and back
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Testing
app.get('/', (req, res) => {
    res.json({ message: 'App is Running'})
}) 

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})