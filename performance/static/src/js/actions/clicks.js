import {
  ADD_CLICK
} from '../constants/actionTypes'

export const addClick = value => ({
  type: ADD_CLICK,
  payload: value
})

export const addClickFake = value => ({
  type: ADD_CLICK,
  payload: value
})
