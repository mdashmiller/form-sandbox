import React from 'react'
import ReactDOM from 'react-dom'
import Form from '../../components/Form'

import { shallow } from 'enzyme'

import { findByTestAttr } from '../../Utils'

// render component for testing
const setUp = (props = {}) => {
  return shallow(<Form {...props} />)
}

describe('Form rendering', () => {

  let component
  beforeAll(() => {
    component = setUp()
  })

  it('should render 1 form', () => {
    const wrapper = findByTestAttr(component, 'contact-form')
    expect(wrapper.length).toBe(1)
  })

  it('should render 1 name input', () => {
    const wrapper = findByTestAttr(component, 'name')
    expect(wrapper.length).toBe(1)
  })

  it('should render 1 message input', () => {
    const wrapper = findByTestAttr(component, 'message')
    expect(wrapper.length).toBe(1)
  })

  it('should render 1 submit input', () => {
    const wrapper = findByTestAttr(component, 'submit')
    expect(wrapper.length).toBe(1)
  })

})

describe('Form mounting and unmounting', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Form />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

})
