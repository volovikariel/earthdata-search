import browseImageryReducer from '../browseImagery'
import {
  SET_BROWSE_IMAGE_LOADED,
  SET_BROWSE_IMAGE_LOADING,
  SET_BROWSE_IMAGE_BLOB_URL
} from '../../constants/actionTypes'

const initialState = {}

describe('INITIAL_STATE', () => {
  test('is correct', () => {
    const action = { type: 'dummy_action' }

    expect(browseImageryReducer(undefined, action)).toEqual(initialState)
  })
})

describe('SET_BROWSE_IMAGE_LOADING', () => {
  test('returns the correct state', () => {
    const action = {
      type: SET_BROWSE_IMAGE_LOADING,
      payload: {
        conceptId: 'C1000005-ESDC',
        size: 256
      }
    }

    const expectedState = {
      'C1000005-ESDC': {
        256: {
          isLoading: true,
          isLoaded: false
        }
      }
    }

    expect(browseImageryReducer(undefined, action)).toEqual(expectedState)
  })
})

describe('SET_BROWSE_IMAGE_LOADED', () => {
  test('returns the correct state', () => {
    const action = {
      type: SET_BROWSE_IMAGE_LOADED,
      payload: {
        conceptId: 'C1000005-ESDC',
        size: 256
      }
    }

    const expectedState = {
      'C1000005-ESDC': {
        256: {
          isLoading: false,
          isLoaded: true
        }
      }
    }

    expect(browseImageryReducer(undefined, action)).toEqual(expectedState)
  })
})

describe('SET_BROWSE_IMAGE_BLOB_URL', () => {
  test('returns the correct state', () => {
    const action = {
      type: SET_BROWSE_IMAGE_BLOB_URL,
      payload: {
        conceptId: 'C1000005-EDSC',
        localUrl: 'assets/image.jpg',
        size: 256
      }
    }

    const expectedState = {
      'C1000005-EDSC': {
        256: {
          isLoading: false,
          isLoaded: true,
          localUrl: 'assets/image.jpg'
        }
      }
    }

    expect(browseImageryReducer(undefined, action)).toEqual(expectedState)
  })
})
