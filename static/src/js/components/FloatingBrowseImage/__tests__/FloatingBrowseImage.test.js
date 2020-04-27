import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FloatingBrowseImage from '../FloatingBrowseImage'

Enzyme.configure({ adapter: new Adapter() })

function setup(overrideProps) {
  const props = {
    height: 200,
    src: '',
    width: 200,
    ...overrideProps
  }

  const enzymeWrapper = shallow(<FloatingBrowseImage {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('FloatingBrowseImage component', () => {
  describe('when no image is present', () => {
    test('renders itself correctly', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.type()).toBe(null)
    })
  })

  describe('when an image is present', () => {
    test('renders itself correctly', () => {
      const { enzymeWrapper } = setup({
        conceptId: 'C1000005-EDSC',
        height: 200,
        isLoaded: true,
        isLoading: false,
        src: '/some/image/src',
        width: 200
      })

      expect(enzymeWrapper.type()).toBe('div')
    })
  })

  // https://stackoverflow.com/questions/55342181/set-state-when-testing-functional-component-with-usestate-hook
  // describe('buttons', () => {
  //   test('when clicking the close button, closes the image', () => {
  //     const { enzymeWrapper } = setup({
  //       src: '/some/image/src'
  //     })

  //     expect(enzymeWrapper.state().isOpen).toEqual(true)

  //     enzymeWrapper.find('Button').simulate('click')

  //     expect(enzymeWrapper.state().isOpen).toEqual(false)
  //   })

  //   test('when clicking the open button, closes the image', () => {
  //     const { enzymeWrapper } = setup({
  //       conceptId: 'C1000005-EDSC',
  //       height: 200,
  //       isLoaded: true,
  //       isLoading: false,
  //       src: '/some/image/src',
  //       width: 200
  //     })

  //     enzymeWrapper.instance().setIsOpen(true)

  //     expect(enzymeWrapper.state('isOpen')).toEqual(false)

  //     enzymeWrapper.find('Button').simulate('click')

  //     expect(enzymeWrapper.state('isOpen')).toEqual(true)
  //   })
  // })
})
