import { UPDATE_FACETS } from '../constants/actionTypes'

const initialState = {
  byId: {},
  allIds: []
}

const resultToStateObj = result => result

const facetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FACETS: {
      const byId = {}
      const allIds = []
      action.payload.facets.forEach((result) => {
        byId[result.field] = resultToStateObj(result)
        allIds.push(result.field)
      })

      return {
        ...state,
        byId,
        allIds
      }
    }
    default:
      return state
  }
}

export default facetsReducer
