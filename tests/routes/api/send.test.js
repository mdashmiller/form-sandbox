const expect = require('chai').expect
const mockery = require('mockery')
const nodemailerMock = require('nodemailer-mock')

describe('sending email from /api/send middleware', () => {

  before(() => {
    mockery.enable({ warnOnUnregistered: false })
    mockery.registerMock('nodemailer', nodemailerMock)
    const mockTransporter = require('../../../services/nodemailer')
  })

  afterEach(() => nodemailerMock.mock.reset())

  after(() => {
    mockery.deregisterAll()
    mockery.disable()
  })

  it('should send an email using nodemailer-mock', done => {
    // call a service that uses nodemailer
    var response = ... // <-- your email code here

    // a fake test for something on our response
    response.value.should.be.exactly('value')

    // get the array of emails we sent
    const sentMail = nodemailerMock.mock.sentMail()

    // we should have sent one email
    sentMail.length.should.be.exactly(1)

    // check the email for something
    sentMail[0].property.should.be.exactly('foobar')

    done()
  })

})
