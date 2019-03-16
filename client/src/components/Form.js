import React from 'react'
import './styles.scss'

const Form = () => {
  return (
    <div className="container">
      <form data-test="contact-form">
        <h4>mission submission...</h4>
        <div className="input-group">
          <label htmlFor="name">NAME</label>
          <input data-test="name" name="name" type="text" />
          <label htmlFor="message">MESSAGE</label>
          <input data-test="message" name="message" type="text" />
          <input data-test="submit" type="submit" className="btn" />
        </div>
      </form>
    </div>
  )
}

export default Form
