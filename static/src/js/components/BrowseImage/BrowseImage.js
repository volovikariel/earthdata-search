import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '../Spinner/Spinner'

export const BrowseImage = ({
  alt,
  className,
  height,
  isLoaded,
  isLoading,
  spinnerSize,
  src,
  width
}) => {
  if (!isLoaded && isLoading) {
    return (
      <Spinner type="dots" size={spinnerSize} />
    )
  }

  // We default the `src` to an empty to string to allow the rendering
  // of this component while the request for the image is still in flight
  if (!src) return null

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      height={height}
      width={width}
    />
  )
}

BrowseImage.defaultProps = {
  alt: '',
  className: '',
  isLoaded: false,
  isLoading: false,
  spinnerSize: 'tiny',
  src: ''
}

BrowseImage.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.number.isRequired,
  isLoaded: PropTypes.bool,
  isLoading: PropTypes.bool,
  spinnerSize: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.number.isRequired
}

export default BrowseImage
