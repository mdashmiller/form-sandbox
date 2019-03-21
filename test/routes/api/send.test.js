const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const nodemailer = require('nodemailer')
const transporter = require('../../../services/nodemailer')

const expect = chai.expect
chai.use(sinonChai)

describe('POST /api/send', () => {

  describe('nodemailer middleware', () => {

    // create a testable transporter
    let createTransportSpy
    beforeEach(() => {
      createTransportSpy = sinon.spy(nodemailer, 'createTransport')
    })

    afterEach(() => {
      createTransportSpy.restore()
    })

    it('calls transporter.sendMail()', () => {
      let sendMailSpy = sinon.spy(transporter, 'sendMail')

      transporter.sendMail({}, () => { })

      expect(sendMailSpy).to.have.been.calledOnce

      sendMailSpy.restore()
    })

    describe('sendMail()', () => {

      // create a stub of transporter.sendMail() 
      let sendMailStub
      beforeEach(() => {
        sendMailStub = sinon.stub(transporter, 'sendMail')
      })

      afterEach(() => {
        sendMailStub.restore()
      })
      
      it('should invoke callback after sending the email', () => {
        // create a test callback and set the
        // sendMail stub to invoke it
        let callbackSpy = sinon.spy()
        sendMailStub.yields()

        transporter.sendMail({}, callbackSpy)

        expect(callbackSpy).to.have.be.calledOnce
      })

      it('should send email with the expected mail options', () => {
        // create a test mailOptions object
        let mailOptions = {
          from: 'test@test.com',
          to: 'send@to.com',
          subject: 'test email',
          html: 'some html'
        }

        transporter.sendMail(mailOptions, () => {})

        expect(sendMailStub).to.be.calledWith(mailOptions)
      })

    })

  })

})



// const expect = require('chai').expect
// const mockery = require('mockery')
// const nodemailerMock = require('nodemailer-mock')

// describe('POST request to /api/send to send email', () => {

//   let app = null

//   before(() => {
//     mockery.enable({ warnOnUnregistered: false })
//     mockery.registerMock('nodemailer', nodemailerMock)

//     app = require('../../../server')
//     const mockTransporter = require('../../../services/nodemailer')
//   })

//   afterEach(() => nodemailerMock.mock.reset())

//   after(() => {
//     mockery.deregisterAll()
//     mockery.disable()
//   })

//   it('should send an email using nodemailer-mock', done => {
//     // call a service that uses nodemailer
//     var response = ... // <-- your email code here

//     // a fake test for something on our response
//     response.value.should.be.exactly('value')

//     // get the array of emails we sent
//     const sentMail = nodemailerMock.mock.sentMail()

//     // we should have sent one email
//     sentMail.length.should.be.exactly(1)

//     // check the email for something
//     sentMail[0].property.should.be.exactly('foobar')

//     done()
//   })

// })
