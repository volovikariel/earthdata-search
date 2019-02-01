import { UPDATE_COLLECTIONS } from '../constants/actionTypes'

const initialState = {
  collections: []
}

const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COLLECTIONS:
      return { ...state, collections: action.payload }
    default:
      return state
  }
}

export default collectionsReducer
