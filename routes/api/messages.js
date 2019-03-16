const express = require('express')
const router = express.Router()
const uuid = require('uuid')

// pseudo db
const messages = [
  {
    id: uuid(),
    name: 'Bart Simpson',
    message: 'Will I ever turn eleven?!'
  },
  {
    id: uuid(),
    name: 'Jean Valjean',
    message: 'I don\'t mind stealing bread...'
  }
]

// @route   GET api/messages
// @desc    GET all messages
// @access  Public
router.get('/', (req, res) => {
  res.json(messages)
})

// @route   POST api/messages
// @desc    Create a message
// @access  Public
router.post('/', (req, res) => {
  const newMessage = {
    id: uuid(),
    name: req.body.name,
    message: req.body.message
  }

  messages.push(newMessage)
  res.json(messages)
})

// @route   DELETE api/messages/:id
// @desc    Remove a message
// @access  Public
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const newMessages = messages.filter(message => 
    message.id !== id  
  )

  const success = (newMessages.length !== messages.length) ? true : false

  res.json({...newMessages, success})
})

module.exports = router
