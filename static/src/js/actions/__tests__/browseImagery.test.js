import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  setBrowseImageLoaded,
  setBrowseImageLoading,
  setBrowseImageBlobUrl,
  fetchBrowseImage
} from '../browseImagery'
import {
  ADD_ERROR,
  SET_BROWSE_IMAGE_BLOB_URL,
  SET_BROWSE_IMAGE_LOADED,
  SET_BROWSE_IMAGE_LOADING
} from '../../constants/actionTypes'

const mockStore = configureMockStore([thunk])

beforeEach(() => {
  jest.clearAllMocks()
})

describe('setBrowseImageLoaded', () => {
  test('should create an action to update the store', () => {
    const payload = {
      conceptId: 'C1000005-ESDC',
      size: 200
    }
    const expectedAction = {
      type: SET_BROWSE_IMAGE_LOADED,
      payload
    }
    expect(setBrowseImageLoaded(payload)).toEqual(expectedAction)
  })
})

describe('setBrowseImageLoading', () => {
  test('should create an action to update the store', () => {
    const payload = {
      conceptId: 'C1000005-ESDC',
      size: 200
    }

    const expectedAction = {
      type: SET_BROWSE_IMAGE_LOADING,
      payload
    }
    expect(setBrowseImageLoading(payload)).toEqual(expectedAction)
  })
})

describe('setBrowseImageBlobUrl', () => {
  test('should create an action to update the store', () => {
    const expectedAction = {
      type: SET_BROWSE_IMAGE_BLOB_URL
    }
    expect(setBrowseImageBlobUrl()).toEqual(expectedAction)
  })
})

describe('fetchBrowseImage', () => {
  afterEach(() => {
    window.URL.createObjectURL.mockReset()
  })

  test('calls lambda to get browse image', async () => {
    window.URL.createObjectURL = jest.fn(
      () => 'blob:http://localhost/35v6-cd34f4-366f6d-06453634'
    )

    nock(/localhost/)
      .get(/browse_scaler/)
      .reply(200, Buffer.from(''))

    // mockStore with initialState
    const store = mockStore({
      authToken: 'testToken'
    })

    // call the dispatch
    await store.dispatch(fetchBrowseImage('datasets', 'C100005-EDSC', 200, 200)).then(() => {
      const storeActions = store.getActions()
      expect(storeActions[0]).toEqual({
        type: SET_BROWSE_IMAGE_LOADING,
        payload: {
          conceptId: 'C100005-EDSC',
          size: 200
        }
      })
      expect(storeActions[1]).toEqual({
        type: SET_BROWSE_IMAGE_LOADED,
        payload: {
          conceptId: 'C100005-EDSC',
          size: 200
        }
      })
      expect(storeActions[2]).toEqual({
        type: SET_BROWSE_IMAGE_BLOB_URL,
        payload: {
          conceptId: 'C100005-EDSC',
          localUrl: 'blob:http://localhost/35v6-cd34f4-366f6d-06453634',
          size: 200
        }
      })
    })
  })

  test('calls the error logger', async () => {
    window.URL.createObjectURL = jest.fn(
      () => 'blob:http://localhost/35v6-cd34f4-366f6d-06453634'
    )

    nock(/localhost/)
      .get(/browse_scaler/)
      .reply(500)

    nock(/localhost/)
      .post(/error_logger/)
      .reply(200)

    const store = mockStore({
      authToken: 'testToken'
    })

    const consoleMock = jest.spyOn(console, 'error').mockImplementation(() => jest.fn())

    await store.dispatch(fetchBrowseImage('datasets', 'C100005-EDSC', 200, 200)).then(() => {
      const storeActions = store.getActions()
      expect(storeActions[0]).toEqual({
        type: SET_BROWSE_IMAGE_LOADING,
        payload: {
          conceptId: 'C100005-EDSC',
          size: 200
        }
      })
      expect(storeActions[1]).toEqual({
        type: SET_BROWSE_IMAGE_LOADED,
        payload: {
          conceptId: 'C100005-EDSC',
          size: 200
        }
      })
      expect(storeActions[2]).toEqual({
        type: SET_BROWSE_IMAGE_BLOB_URL,
        payload: {
          conceptId: 'C100005-EDSC',
          localUrl: 'test-file-stub',
          size: 200
        }
      })
      expect(storeActions[3]).toEqual({
        type: ADD_ERROR,
        payload: expect.objectContaining({
          title: 'Error retrieving browse image',
          message: 'There was a problem completing the request'
        })
      })
      expect(consoleMock).toHaveBeenCalledTimes(1)
    })
  })
})
