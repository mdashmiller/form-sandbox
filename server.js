const express = require('express')
const bodyParser = require('body-parser')

const exampleData = require('./routes/api/exampleData')
const messages = require('./routes/api/messages')

const app = express()

// use body-parser middleware
app.use(bodyParser.json())

// use routes
app.use('/api/example-data', exampleData)
app.use('/api/messages', messages)

const port = 5000

app.listen(port, () => console.log(`server started on port ${port}`))
