const app = require('../../../server')
const request = require('supertest')
const expect = require('chai').expect
const nodemailerMock = require('nodemailer-mock')

describe('POST request to /api/send to send email', () => {

  // testable message data
  const reqBody = {
    name: 'testName',
    message: 'testMessage'
  }

  const testMessage = {
    from: 'testUser',
    to: 'testReceiver',
    subject: 'test subject',
    html: 'test html'
  }

  describe('message send fail', () => {
    // test for msg: 'fail'
  })

  describe('message send success', () => {

    it('should respond with JSON', done => {
      request(app)
        .post('/api/send')
        .send(reqBody)
        .expect('Content-Type', /json/)
        .expect(200, done)
        // test for msg: 'success'

      nodemailerMock.mock.reset()
    })

    it('should send email using nodemailer-mock with expected properties', done => {
      let response = request(app)
        .post('/api/send')
        .send(reqBody)

      let sentMail = nodemailerMock.mock.sentMail()

      expect(sentMail.length).to.equal(1)
      expect(sentMail[0].from).to.equal(testMessage.from)
      expect(sentMail[0].to).to.equal(testMessage.to)
      expect(sentMail[0].subject).to.equal(testMessage.subject)
      expect(sentMail[0].html).to.equal(testMessage.html)

      done()

      nodemailerMock.mock.reset()
    })

    it('should send email with expected values from req.body', done => {
      let response = request(app)
        .post('/api/send')
        .send(reqBody)

      expect(response).to.have.nested.property('_data.name', reqBody.name)
      expect(response).to.have.nested.property('_data.message', reqBody.message)

      done()

      nodemailerMock.mock.reset()
    })

  })

})
