const express = require('express')
const bodyParser = require('body-parser')

const send = require('./routes/api/send')
const exampleData = require('./routes/api/exampleData')
const messages = require('./routes/api/messages')

const app = express()

// use body-parser middleware
app.use(bodyParser.json())

// use routes
app.use('/api/send', send)
app.use('/api/example-data', exampleData)
app.use('/api/messages', messages)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
