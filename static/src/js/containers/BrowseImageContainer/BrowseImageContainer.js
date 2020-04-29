import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import actions from '../../actions'
import BrowseImage from '../../components/BrowseImage/BrowseImage'
import FloatingBrowseImage from '../../components/FloatingBrowseImage/FloatingBrowseImage'

export const BrowseImageContainer = ({
  className,
  conceptId,
  conceptType,
  height,
  isFloating,
  isScrolling,
  width
}) => {
  if (conceptId == null) return null

  const browseImagery = useSelector(state => state.browseImagery)

  const dispatch = useDispatch()

  const { [conceptId]: browseImageState = {} } = browseImagery
  const { [height]: browseImage = {} } = browseImageState

  const {
    isLoaded,
    isLoading,
    localUrl
  } = browseImage

  // Sets loading to true by default because the value of isLoading from the store
  // may not be set at all when this component is rendered which results in a broken
  // image temporarily
  const [internalIsLoaded, setIsLoaded] = useState(false)
  const [internalIsLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoaded !== null) setIsLoaded(isLoaded)
  }, [isLoaded])

  useEffect(() => {
    if (isLoading !== null) setIsLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    // If there is already a localUrl dont attempt to retrieve it again
    if (localUrl) return

    // Only make the request if were stopped where the image is visible
    if (isScrolling === true) return

    // If concept id is set to an actual value
    if (conceptId && conceptId === '') return

    // Don't fire another request if one is currently in flight
    if (isLoading === true) return

    // No need to fetch the image if the user is scrolling by the image or it has already been retrieved
    dispatch(actions.fetchBrowseImage(conceptType, conceptId, height, width))
  }, [isScrolling, conceptId])

  if (isFloating) {
    return (
      <FloatingBrowseImage
        alt={`Browse Image for ${conceptId}`}
        className={className}
        conceptId={conceptId}
        height={height}
        isLoaded={internalIsLoaded}
        isLoading={internalIsLoading}
        src={localUrl}
        width={width}
      />
    )
  }

  return (
    <BrowseImage
      alt={`Browse Image Thumbnail for ${conceptId}`}
      src={localUrl}
      className={className}
      height={height}
      isLoaded={internalIsLoaded}
      isLoading={internalIsLoading}
      width={width}
    />
  )
}

BrowseImageContainer.defaultProps = {
  className: '',
  conceptId: null,
  isFloating: false,
  isScrolling: false
}

BrowseImageContainer.propTypes = {
  className: PropTypes.string,
  conceptId: PropTypes.string,
  conceptType: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  isFloating: PropTypes.bool,
  isScrolling: PropTypes.bool,
  width: PropTypes.number.isRequired
}

export default BrowseImageContainer
