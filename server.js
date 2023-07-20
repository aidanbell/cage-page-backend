const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')

const app = express()

require('dotenv').config()
require('./config/database')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))


// Routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// API routing
app.use('/api', require('./routes/api'))
app.use('/api/auth', require('./routes/auth'))

// 404 Handling
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' })
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))