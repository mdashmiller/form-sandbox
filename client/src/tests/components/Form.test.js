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

  describe('when a submission has not been made', () => {

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

  // // can't test these conditional renders until
  // // Enzyme adds support for Hooks
  // describe('after a submission event', () => {

  //   it('should render 1 form', () => {
  //     const wrapper = findByTestAttr(component, 'contact-form')
  //     expect(wrapper.length).toBe(1)
  //   })

  //   it('should render 1 name input', () => {
  //     const wrapper = findByTestAttr(component, 'name')
  //     expect(wrapper.length).toBe(1)
  //   })

  //   it('should render 1 message input', () => {
  //     const wrapper = findByTestAttr(component, 'message')
  //     expect(wrapper.length).toBe(1)
  //   })

  //   it('should render two output paragraphs', () => {

  //   })

  //   it('should render 1 clear button', () => {
  //     const wrapper = findByTestAttr(component, 'clear')
  //     expect(wrapper.length).toBe(1)
  //   })

  // })

})

// // can't test these functions until Enzyme adds
// // support for Hooks
// describe('setName()', () => {
  
//   const event = {
//     target: {
//       value: 'some string'
//     }
//   }

//   let component, instance
//   beforeEach(() => {
//     component = setUp()
//     instance = component.instance()
//   })

//   describe('spying on setName()', () => {

//     it('should be called when user types in the name field', () => {
//       const wrapper = findByTestAttr(component, 'name') 
//       jest.spyOn(instance, 'setName')

//       wrapper.simulate('change', event)

//       expect(instance.setName).toHaveBeenCalledTimes(2)
//     })

//   })

//   describe('directly invoking on setName()', () => {

//     it('should set the name in state', () => {

//     })

//   })

// })

// describe('setMessage()', () => {

//   let component, instance
//   beforeEach(() => {
//     component = setUp()
//     instance = component.instance()
//   })

//   describe('spying on setMessage()', () => {

//     it('should be called when user types in the message field', () => {

//     })

//   })

//   describe('directly invoking on setMessage()', () => {

//     it('should set the message in state', () => {

//     })

//   })

// })

describe('Form mounting and unmounting', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Form />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

})
