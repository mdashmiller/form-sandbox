const mockery = require('mockery')
const nodemailerMock = require('nodemailer-mock')
const request = require('supertest')
const expect = require('chai').expect

describe('POST request to /api/send', () => {

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

  let app

  before(() => {
    mockery.enable({ warnOnUnregistered: false })
    mockery.registerMock('nodemailer', nodemailerMock)

    app = require('../../../server')
  })

  after(function () {
    mockery.deregisterAll()
    mockery.disable()
  })

  // describe('send failure', () => {

  //   it('should fail to send an email', done => {
      
  //   })

  // })

  describe('send success', () => {

    it('should respond with JSON success message', done => {
      request(app)
        .post('/api/send')
        .send(reqBody)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.msg).to.equal('success')
          done()
        })
        .catch(err => done(err))

      nodemailerMock.mock.reset()
    })

    it('should send email using nodemailer-mock with expected properties', done => {
      request(app)
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
