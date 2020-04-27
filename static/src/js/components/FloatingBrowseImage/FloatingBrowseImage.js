import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import BrowseImage from '../BrowseImage/BrowseImage'
import Button from '../Button/Button'

import './FloatingBrowseImage.scss'

/**
 * Renders FloatingBrowseImage.
 * @param {Object} props - The props passed into the component.
 * @param {String} src - The image source.
 */
const FloatingBrowseImage = ({
  alt,
  conceptId,
  height,
  isLoaded,
  isLoading,
  src,
  width
}) => {
  // Prevent rendering the component when no concept id is set
  if (!conceptId) return null

  const [isOpen, setIsOpen] = useState(true)
  const handleToggleImage = () => setIsOpen(!isOpen)

  const containerClassName = classNames({
    'floating-browse-image': true,
    'floating-browse-image--is-open': isOpen
  })

  const imageClassName = classNames({
    'floating-browse-image__image': true,
    'floating-browse-image__image--is-loaded': isLoaded
  })

  const browseImage = (
    <BrowseImage
      alt={alt}
      className={imageClassName}
      conceptId={conceptId}
      height={height}
      isLoaded={isLoaded}
      isLoading={isLoading}
      width={width}
      spinnerSize="small"
      src={src}
    />
  )

  return (
    <div className={containerClassName}>
      {
        isOpen ? (
          <Button
            className="floating-browse-image__button floating-browse-image__button--close"
            icon="times"
            onClick={handleToggleImage}
            label="Close browse image"
          />
        ) : (
          <Button
            className="floating-browse-image__button floating-browse-image__button--open"
            icon="plus"
            onClick={handleToggleImage}
            label="Open browse image"
          />
        )
      }
      <div className="floating-browse-image__container">
        {browseImage}
        {
          (!isLoaded && isLoading) && (
            <div className="floating-browse-image__placeholder">
              {browseImage}
            </div>
          )
        }
      </div>
    </div>
  )
}

FloatingBrowseImage.defaultProps = {
  alt: '',
  conceptId: null,
  isLoaded: false,
  isLoading: false,
  src: ''
}

FloatingBrowseImage.propTypes = {
  alt: PropTypes.string,
  conceptId: PropTypes.string,
  height: PropTypes.number.isRequired,
  isLoaded: PropTypes.bool,
  isLoading: PropTypes.bool,
  src: PropTypes.string,
  width: PropTypes.number.isRequired
}

export default FloatingBrowseImage
