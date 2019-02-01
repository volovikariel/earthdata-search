import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from '../reducers'

import history from '../util/history'

// Set up the initial state
const initialState = {}

// Build the Redux store
const store = createStore(
  createRootReducer(history),
  initialState,

  // Build out the Redux middleware
  compose(
    applyMiddleware(

      // Set up Redux's connection with React Router
      routerMiddleware(history),
    ),

    // Add the Redux Thunk middleware, along with the websocket connection
    applyMiddleware(thunk),

    // Add the Redux Devtools extension
    // eslint-disable-next-line
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
)

export default store
