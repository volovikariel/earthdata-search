import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { GranuleResultsBrowseImageCell } from '../GranuleResultsBrowseImageCell'
import {
  BrowseImageContainer
} from '../../../containers/BrowseImageContainer/BrowseImageContainer'

Enzyme.configure({ adapter: new Adapter() })

function setup(overrideProps) {
  const props = {
    row: {
      original: {}
    },
    ...overrideProps
  }

  const enzymeWrapper = shallow(<GranuleResultsBrowseImageCell {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('GranuleResultsBrowseImageCell component', () => {
  describe('when no image is passed', () => {
    test('renders itself correctly', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.type()).toBe('div')
      expect(enzymeWrapper.children().length).toEqual(0)
    })
  })

  describe('browse flag is false', () => {
    test('renders itself correctly', () => {
      const { enzymeWrapper } = setup({
        row: {
          original: {
            browseFlag: false,
            granuleThumbnail: 'http://someplace.com/src/image.jpg'
          }
        }
      })

      expect(enzymeWrapper.type()).toBe('div')
      expect(enzymeWrapper.children().length).toEqual(0)
    })
  })

  describe('when given a valid image and browse url', () => {
    test('renders itself correctly', () => {
      const { enzymeWrapper } = setup({
        row: {
          original: {
            browseFlag: true,
            browseUrl: 'http://someplace.com/browse/link'
          }
        }
      })

      expect(enzymeWrapper.type()).toBe('div')
      expect(enzymeWrapper.children().length).toEqual(1)
      expect(enzymeWrapper.childAt(0).props().className).toEqual('granule-results-browse-image-cell__thumb')
      expect(enzymeWrapper.childAt(0).type()).toEqual('a')
      expect(enzymeWrapper.childAt(0).props().href).toEqual('http://someplace.com/browse/link')
      expect(enzymeWrapper.childAt(0).find(BrowseImageContainer)).toBeDefined()
    })
  })
})
