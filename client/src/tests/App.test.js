import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

import { shallow } from 'enzyme'

import { findByTestAttr } from '../Utils'

// render component for testing
const setUp = (props = {}) => {
  return shallow(<App {...props} />)
}

describe('App rendering', () => {

  let component
  beforeAll(() => {
    component = setUp()
  })

  it('should render 1 Form component', () => {
    const wrapper = findByTestAttr(component, 'form')
    expect(wrapper.length).toBe(1)
  })
  
})

describe('App mounting and unmounting', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

})
