const express = require('express')
const router = express.Router()

// psuedo db
const data = {
  greeting: 'hellerrr!'
}

// @route   GET api/example-data
// @desc    GET example data
// @access  Public
router.get('/', (req, res) => {
  res.json(data)
})

module.exports = router
