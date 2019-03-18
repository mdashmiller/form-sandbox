const express = require('express')
const nodemailer = require('nodemailer')

const router = express.Router()

router.post('/', (req, res, next) => {
  const sender = req.body.name
  const message = `
    <h4>New Message</h4>
    <p>Name: ${req.body.name}</p>
    <p>Message: ${req.body.message}</p>
    `

  async function main() {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let account = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'ether@ethereal.com', // sender address
      to: "myfakeinbox@me.com", // list of receivers
      subject: "Message from the sandbox", // Subject line
      // text: "Hello world?", // plain text body
      html: message // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  main().catch(console.error);
})

module.exports = router
