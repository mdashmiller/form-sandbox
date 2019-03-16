const express = require('express')

const app = express()

app.get('/api/data', (req, res) => {
  const data = {
    greeting: 'hellerrr!'
  }

  res.json(data)
})

const port = 5000

app.listen(port, () => console.log(`server started on port ${port}`))
