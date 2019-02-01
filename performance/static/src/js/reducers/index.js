import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import clicksReducer from './clicks'
import collectionsReducer from './collections'

// eslint-disable-next-line
export default (history) => combineReducers({
  router: connectRouter(history),
  clicks: clicksReducer,
  collections: collectionsReducer
})
