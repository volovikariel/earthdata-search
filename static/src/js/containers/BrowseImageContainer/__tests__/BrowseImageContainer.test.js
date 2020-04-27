import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BrowseImageContainer } from '../BrowseImageContainer'
import { BrowseImage } from '../../../components/BrowseImage/BrowseImage'

Enzyme.configure({ adapter: new Adapter() })

function setup(overrideProps) {
  const props = {
    browseImagery: {
      'C1000005-EDSC': {
        200: {
          isLoaded: true,
          isLoading: false,
          localUrl: 'assets/image.jpg'
        }
      }
    },
    className: 'test-class',
    conceptId: 'C1000005-EDSC',
    conceptType: 'datasets',
    height: 200,
    isScrolling: false,
    onFetchBrowseImage: jest.fn(),
    width: 200,
    ...overrideProps
  }

  const enzymeWrapper = shallow(
    <BrowseImageContainer {...props} />
  )

  return {
    enzymeWrapper,
    props
  }
}

describe('BrowseImageContainer component', () => {
  test('renders null when no browse image entry is found in the store', () => {
    const { enzymeWrapper } = setup({
      browseImagery: {}
    })

    const orderStatus = enzymeWrapper.find(BrowseImageContainer)
    expect(orderStatus).toBeDefined()
  })

  test('renders a BrowseImage when all props are provided', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find(BrowseImage).length).toBe(1)
    expect(enzymeWrapper.find(BrowseImage).props().className).toEqual('test-class')
    expect(enzymeWrapper.find(BrowseImage).props().height).toEqual(200)
    expect(enzymeWrapper.find(BrowseImage).props().src).toEqual('assets/image.jpg')
    expect(enzymeWrapper.find(BrowseImage).props().width).toEqual(200)
  })
})
