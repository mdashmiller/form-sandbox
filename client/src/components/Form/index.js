import React, { useState } from 'react'
import axios from 'axios'
import './styles.scss'

const Form = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState(false)

  function handleChange(e) {
    const field = e.target.name

    switch(field) {
      case 'name':
        setName(e.target.value)
        break
      case 'message':
        setMessage(e.target.value)
        break
      default:
        return
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault()

    setSubmitStatus(true)

    const data = {name, message}

    axios
      .post('/send', data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  function reset() {
    setName('')
    setMessage('')
    setSubmitStatus(false)
  }

  return (
    <div className="container">
      <form
        data-test="contact-form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h4>mission submission...</h4>
        <div className="form-group">
          <label htmlFor="name">NAME</label>
          <input
            data-test="name"
            name="name"
            type="text"
            className="form-element"
            value={name}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="message">MESSAGE</label>
          <input
            data-test="message"
            name="message"
            type="text"
            className="form-element"
            value={message}
            onChange={(e) => handleChange(e)}
          />
          {!submitStatus ? (
            <input
              data-test="submit"
              type="submit" 
              className="form-element btn"
            />
          ) : (
            <div>
              <p>You entered the name: {name}</p>
              <p>And your message is: {message}</p>
              <button
                data-test="clear"
                className="form-element btn clear"
                onClick={() => reset()}
              >
                clear
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Form
