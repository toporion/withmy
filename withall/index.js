const express = require('express')
const app = express()
const cors=require('cors')
const bodyParser=require('body-parser')
require('dotenv').config()
require('./models/db')
const AuthRoute=require('./routes/AuthRoute')
const port = process.env.PORT || 8080;

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use('/api',AuthRoute)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})