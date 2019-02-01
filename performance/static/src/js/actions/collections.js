import Api from '../util/api'

import { UPDATE_COLLECTIONS } from '../constants/actionTypes'

export const updateCollections = collections => ({
  type: UPDATE_COLLECTIONS,
  payload: collections
})

export const getCollections = query => dispatch => (
  Api.getCollections(query).then((response) => {
    dispatch(updateCollections(response.feed.entry))
  }, (error) => {
    throw new Error('Request failed', error)
  })
)
