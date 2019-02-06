import API from '../util/api'

import { UPDATE_COLLECTIONS, UPDATE_FACETS } from '../constants/actionTypes'

export const updateCollections = payload => ({
  type: UPDATE_COLLECTIONS,
  payload
})

export const updateFacets = payload => ({
  type: UPDATE_FACETS,
  payload
})

export const getCollections = keyword => dispatch => (
  API.endpoints.collections.getAll({
    keyword,
    includeFacets: true,
    pageSize: 20,
    pageNum: 1,
    hasGranulesOrCwic: true,
    includeHasGranules: true,
    includeGranuleCounts: true
  }).then((response) => {
    const payload = {
      results: response.data.feed.entry,
      facets: response.data.feed.facets
    }

    if (keyword) {
      payload.keyword = keyword
    }

    dispatch(updateCollections(payload))
    dispatch(updateFacets(payload))
  }, (error) => {
    throw new Error('Request failed', error)
  })
)
