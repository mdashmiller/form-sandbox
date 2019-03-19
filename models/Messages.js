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

module.exports = messages
