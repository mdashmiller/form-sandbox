const expect = require('chai').expect
const request = require('supertest')
const app = require('../../../server')

describe('GET /api/messages', () => {

  it('should respond with JSON', done => {
    request(app)
      .get('/api/messages')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

})
