import { ADD_CLICK } from '../constants/actionTypes'

const initialState = {
  value: 0
}

const clicksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLICK:
      return { ...state, value: state.value + action.payload }
    default:
      return state
  }
}

export default clicksReducer
