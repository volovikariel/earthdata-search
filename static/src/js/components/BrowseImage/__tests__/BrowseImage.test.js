import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { BrowseImage } from '../BrowseImage'
import { Spinner } from '../../Spinner/Spinner'

Enzyme.configure({ adapter: new Adapter() })

function setup(overrideProps) {
  const props = {
    alt: 'Thumbnail for C1000005-EDSC',
    className: 'test-class',
    conceptId: 'C1000005-EDSC',
    height: 200,
    src: 'assets/image.jpg',
    width: 200,
    ...overrideProps
  }

  const enzymeWrapper = shallow(<BrowseImage {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('BrowseImage component', () => {
  test('renders itself correctly', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.type()).toBe('img')
    expect(enzymeWrapper.prop('className')).toBe('test-class')
  })

  test('renders its link correctly', () => {
    const { enzymeWrapper } = setup()

    const image = enzymeWrapper.find('img')

    expect(image.length).toEqual(1)

    expect(image.props().className).toEqual('test-class')
    expect(image.props().alt).toEqual('Thumbnail for C1000005-EDSC')
    expect(image.props().height).toEqual(200)
    expect(image.props().src).toEqual('assets/image.jpg')
    expect(image.props().width).toEqual(200)
  })

  test('renders a spinner when the image is loading', () => {
    const { enzymeWrapper } = setup({
      isLoaded: false,
      isLoading: true
    })

    expect(enzymeWrapper.find(Spinner).length).toBe(1)
    expect(enzymeWrapper.find(Spinner).props().size).toEqual('tiny')
  })
})
