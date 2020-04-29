import React from 'react'
import PropTypes from 'prop-types'

import { getApplicationConfig } from '../../../../../sharedUtils/config'
import BrowseImageContainer from '../../containers/BrowseImageContainer/BrowseImageContainer'

import './GranuleResultsBrowseImageCell.scss'

const { thumbnailSize } = getApplicationConfig()
const {
  height: thumbnailHeight,
  width: thumbnailWidth
} = thumbnailSize

/**
 * Renders GranuleResultsBrowseImageCell.
 * @param {Object} props - The props passed into the component from react-table.
 * @param {Object} props.row - The row info.
 */
export const GranuleResultsBrowseImageCell = (props) => {
  const { row } = props
  const { original: rowProps } = row
  const {
    browseFlag,
    browseUrl,
    id,
    title
  } = rowProps

  const buildThumbnail = () => {
    let element = null

    if (browseFlag) {
      element = (
        <BrowseImageContainer
          alt={`Browse Image for ${title}`}
          className="granule-results-browse-image-cell__thumb-image"
          conceptId={id}
          conceptType="granules"
          height={thumbnailHeight}
          width={thumbnailWidth}
        />
      )

      element = (
        <a
          className="granule-results-browse-image-cell__thumb"
          href={browseUrl}
          title="View image"
          target="_blank"
          rel="noopener noreferrer"
        >
          {element}
        </a>
      )
    }
    return element
  }

  if (!browseFlag) {
    return (
      <div className="granule-results-browse-image-cell" />
    )
  }

  return (
    <div className="granule-results-browse-image-cell granule-results-browse-image-cell--image">
      {buildThumbnail()}
    </div>
  )
}

GranuleResultsBrowseImageCell.propTypes = {
  row: PropTypes.shape({}).isRequired
}

export default GranuleResultsBrowseImageCell
