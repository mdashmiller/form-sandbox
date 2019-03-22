const express = require('express')
const transporter = require('../../services/nodemailer')
const { gmailUser, sendTo } = require('../../config')

const router = express.Router()

// @route   POST api/send
// @desc    Send a message
// @access  Public
router.post('/', (req, res, next) => {
  const message = `
    <p>From: ${req.body.name}</p>
    <p>Message: ${req.body.message}</p>
    `

  // setup email data
  let mailOptions
  if (process.env.NODE_ENV = 'test') {
    mailOptions = {
      from: 'testUser',
      to: 'testReceiver',
      subject: 'test subject',
      html: 'test html'
    }
  } else {
    mailOptions = {
      from: gmailUser,
      to: sendTo,
      subject: 'mattmiller.com contact form submission',
      html: message
    }
  }

  // send mail with imported transport object
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router
