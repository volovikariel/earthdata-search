import BrowseScalerRequest from '../util/request/browseScalerRequest'
import {
  SET_BROWSE_IMAGE_BLOB_URL,
  SET_BROWSE_IMAGE_LOADED,
  SET_BROWSE_IMAGE_LOADING
} from '../constants/actionTypes'

import { buildPromise } from '../util/buildPromise'
import { handleError } from './errors'
import unavailableImg from '../../assets/images/image-unavailable.svg'

export const setBrowseImageLoaded = payload => ({
  type: SET_BROWSE_IMAGE_LOADED,
  payload
})

export const setBrowseImageLoading = payload => ({
  type: SET_BROWSE_IMAGE_LOADING,
  payload
})

export const setBrowseImageBlobUrl = payload => ({
  type: SET_BROWSE_IMAGE_BLOB_URL,
  payload
})

/**
 * Fetch a browse image from browse scaler
 * @param {String} conceptType Name of the CMR concept to request
 * @param {String} conceptId The CMR concept id to retrieve an image for
 * @param {Integer} height Desired height of the thumbnail
 * @param {Integer} width Desired width of the thumbnail
 */
export const fetchBrowseImage = (
  conceptType,
  conceptId,
  height,
  width
) => async (dispatch, getState) => {
  if (!conceptType || !conceptId) return buildPromise(null)

  const { authToken } = getState()

  dispatch(setBrowseImageLoading({
    conceptId,
    size: height
  }))

  const requestObject = new BrowseScalerRequest(authToken)

  const response = await requestObject.fetch(conceptType, conceptId, height, width)
    .then((response) => {
      dispatch(setBrowseImageLoaded({
        conceptId,
        size: height
      }))

      const { data, headers } = response
      const { 'content-type': contentType } = headers

      const localUrl = URL.createObjectURL(
        new Blob(
          [data],
          { type: contentType }
        )
      )

      dispatch(setBrowseImageBlobUrl({
        conceptId,
        localUrl,
        size: height
      }))
    })
    .catch((error) => {
      dispatch(setBrowseImageLoaded({
        conceptId,
        size: height
      }))

      // On error we'll fallback to our local svg
      dispatch(setBrowseImageBlobUrl({
        conceptId,
        size: height,
        localUrl: unavailableImg
      }))

      dispatch(handleError({
        error,
        action: 'fetchBrowseImage',
        resource: 'browse image',
        requestObject
      }))
    })

  return response
}
