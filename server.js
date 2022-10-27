require('dotenv').config()
const express = require('express')
const connectDB = require('./Config/index')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const DB_URL = process.env.DB_URL
const userAPI = require('./Routes/UserRoute')
connectDB(DB_URL)
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/user', userAPI)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
