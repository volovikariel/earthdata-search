import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { BrowseImageContainer } from '../BrowseImageContainer'
import { BrowseImage } from '../../../components/BrowseImage/BrowseImage'
import FloatingBrowseImage from '../../../components/FloatingBrowseImage/FloatingBrowseImage'

Enzyme.configure({ adapter: new Adapter() })

function setup(overrideProps, overrideStore) {
  const props = {
    className: 'test-class',
    conceptId: 'C1000005-EDSC',
    conceptType: 'datasets',
    height: 200,
    isScrolling: false,
    onFetchBrowseImage: jest.fn(),
    width: 200,
    ...overrideProps
  }
  const mockStore = configureMockStore([thunk])

  const store = mockStore({
    browseImagery: {
      'C1000005-EDSC': {
        200: {
          isLoaded: true,
          isLoading: false,
          localUrl: 'assets/image.jpg'
        }
      }
    },
    ...overrideStore
  })

  const enzymeWrapper = mount(
    <Provider store={store}>
      <BrowseImageContainer {...props} />
    </Provider>
  )

  return {
    enzymeWrapper,
    props
  }
}

describe('BrowseImageContainer component', () => {
  test('renders null when no browse image entry is found in the store', () => {
    const { enzymeWrapper } = setup({
    }, {
      browseImagery: {
        'C1000005-EDSC': {
          200: {
            isLoaded: false,
            isLoading: true
          }
        }
      }
    })

    expect(enzymeWrapper).toBeDefined()
  })

  test('renders a BrowseImage when all props are provided', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find(BrowseImage).length).toBe(1)
    expect(enzymeWrapper.find(BrowseImage).props().className).toEqual('test-class')
    expect(enzymeWrapper.find(BrowseImage).props().height).toEqual(200)
    expect(enzymeWrapper.find(BrowseImage).props().src).toEqual('assets/image.jpg')
    expect(enzymeWrapper.find(BrowseImage).props().width).toEqual(200)
  })

  test('renders a FloatingBrowseImage when all props are provided', () => {
    const { enzymeWrapper } = setup({
      isFloating: true
    })

    expect(enzymeWrapper.find(FloatingBrowseImage).length).toBe(1)
    expect(enzymeWrapper.find(FloatingBrowseImage).props().className).toEqual('test-class')
    expect(enzymeWrapper.find(FloatingBrowseImage).props().height).toEqual(200)
    expect(enzymeWrapper.find(FloatingBrowseImage).props().src).toEqual('assets/image.jpg')
    expect(enzymeWrapper.find(FloatingBrowseImage).props().width).toEqual(200)
  })
})
