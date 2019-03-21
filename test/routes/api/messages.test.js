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

  it('should return 2 messages', done => {
    request(app)
      .get('/api/messages')
      .then(res => {
        expect(res.body.length).to.equal(2)
        done()
      })
      .catch(err => done(err))
  })

})

describe('GET /api/tiger-cat', () => {

  it('should respond with a 404', done => {
    request(app)
      .get('/api/tiger-cat')
      .expect(404, done)
  })

})

describe('POST /api/messages', () => {

  const message = {
    name: 'Mr. Test',
    message: 'test message'
  }

  it('should respond with JSON', done => {
    request(app)
      .post('/api/messages')
      .send(message)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('should return 3 messages', done => {
    request(app)
      .get('/api/messages')
      .then(res => {
        expect(res.body.length).to.equal(3)
        done()
      })
      .catch(err => done(err))
  })

})

describe('DELETE /api/messages/test_id', () => {

  it('should respond with JSON', done => {
    request(app)
      .delete('/api/messages/test_id')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('should delete the message with id that matches the req', done => {
    request(app)
      .delete('/api/messages/test_id')
      .then(res => {
        // check that the success message is sent
        expect(res.body.success).to.equal(true)

        // create list of all messages
        let idList = []
        for(const item in res.body) {
          if (res.body[item].id) {
            idList.push(res.body[item])
          }
        }
        // check that the deleted message is not in the list
        expect(idList.indexOf('test_id')).to.equal(-1)
        done()
      })
      .catch(err => done(err))
  })

})
