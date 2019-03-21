const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const nodemailer = require('nodemailer')

const expect = chai.expect
chai.use(sinonChai)

describe('createTransport()', () => {

  // create fake transport object for tests
  let testOptions
  before(() => {
    testOptions = {
      host: 'smtp.testmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'testUser',
        pass: 'testPass'
      }
    }
  })
  
  let createTransportSpy
  beforeEach(() => {
    createTransportSpy = sinon.spy(nodemailer, 'createTransport')
  })

  afterEach(() => {
    createTransportSpy.restore()
  })

  it('should be called with the given options', () => {
    nodemailer.createTransport(testOptions)
    
    expect(createTransportSpy).to.have.been.calledOnce
    expect(createTransportSpy).to.have.been.calledWith(testOptions)
  })

  it('should create a transport object with the options provided', () => {
    let testTransport = nodemailer.createTransport(testOptions)
    
    expect(testTransport)
      .to.have.nested.property('transporter.options.host', testOptions.host)
    expect(testTransport)
      .to.have.nested.property('transporter.options.auth.user', testOptions.auth.user)
    expect(testTransport)
      .to.have.nested.property('transporter.options.auth.pass', testOptions.auth.pass)
  })

})
