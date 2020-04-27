import {
  SET_BROWSE_IMAGE_LOADED,
  SET_BROWSE_IMAGE_LOADING,
  SET_BROWSE_IMAGE_BLOB_URL
} from '../constants/actionTypes'

const initialState = {}

const browseImageryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BROWSE_IMAGE_LOADED: {
      const { payload } = action
      const {
        conceptId,
        size
      } = payload

      const { [conceptId]: conceptState = {} } = state
      const { [size]: currentState } = conceptState

      return {
        ...state,
        [conceptId]: {
          ...conceptState,
          [size]: {
            ...currentState,
            isLoaded: true,
            isLoading: false
          }
        }
      }
    }
    case SET_BROWSE_IMAGE_LOADING: {
      const { payload } = action
      const {
        conceptId,
        size
      } = payload

      const { [conceptId]: conceptState = {} } = state
      const { [size]: currentState } = conceptState

      return {
        ...state,
        [conceptId]: {
          ...conceptState,
          [size]: {
            ...currentState,
            isLoaded: false,
            isLoading: true
          }
        }
      }
    }
    case SET_BROWSE_IMAGE_BLOB_URL: {
      const { payload } = action
      const {
        conceptId,
        localUrl,
        size
      } = payload

      const { [conceptId]: conceptState = {} } = state
      const { [size]: currentState } = conceptState

      return {
        ...state,
        [conceptId]: {
          ...conceptState,
          [size]: {
            ...currentState,
            isLoaded: true,
            isLoading: false,
            localUrl
          }
        }
      }
    }
    default:
      return state
  }
}

export default browseImageryReducer
