import React from 'react'
import PropTypes from 'prop-types'
import EDSCEchoform from '@edsc/echoforms'
import moment from 'moment'

import { mbr } from '../../util/map/mbr'

import './EchoForm.scss'

export const EchoForm = ({
  collectionId,
  form,
  methodKey,
  rawModel,
  shapefileId,
  spatial,
  temporal,
  overrideTemporal,
  onUpdateAccessMethod
}) => {
  const updateAccessMethod = (data) => {
    onUpdateAccessMethod({
      collectionId,
      method: {
        [methodKey]: {
          ...data
        }
      }
    })
  }

  const onFormModelUpdated = (value) => {
    const { model, rawModel } = value
    updateAccessMethod({
      model,
      rawModel
    })
  }

  const onFormIsValidUpdated = (valid) => {
    updateAccessMethod({ isValid: valid })
  }

  // Get the MBR of the spatial for prepopulated values
  const getMbr = (spatial) => {
    const {
      boundingBox = [],
      circle = [],
      point = [],
      polygon = []
    } = spatial

    // if there is no spatial, return undefined
    if (!point[0] && !boundingBox[0] && !polygon[0] && !circle[0]) return undefined

    const {
      swLat,
      swLng,
      neLat,
      neLng
    } = mbr({
      boundingBox: boundingBox[0],
      circle: circle[0],
      point: point[0],
      polygon: polygon[0]
    })

    return {
      BBOX_SOUTH: swLat,
      BBOX_WEST: swLng,
      BBOX_NORTH: neLat,
      BBOX_EAST: neLng
    }
  }

  // Format dates in correct format for Echoforms
  const formatDate = date => moment.utc(date).format('YYYY-MM-DDTHH:mm:ss')

  // Get the temporal prepopulated values
  const getTemporalPrepopulateValues = (temporal, overrideTemporal) => {
    const {
      endDate: overrideEndDate,
      startDate: overrideStartDate
    } = overrideTemporal

    const {
      endDate,
      startDate
    } = temporal

    if (overrideEndDate || overrideStartDate) {
      return {
        TEMPORAL_START: formatDate(overrideStartDate),
        TEMPORAL_END: formatDate(overrideEndDate)
      }
    }

    if (endDate || startDate) {
      return {
        TEMPORAL_START: formatDate(startDate),
        TEMPORAL_END: formatDate(endDate)
      }
    }

    return {}
  }

  const spatialPrepopulateValues = getMbr(spatial)
  const temporalPrepopulateValues = getTemporalPrepopulateValues(temporal, overrideTemporal)

  const prepopulateValues = {
    ...spatialPrepopulateValues,
    ...temporalPrepopulateValues
  }

  // EDSCEchoforms doesn't care about the shapefileId, just is there a shapefileId or not
  const hasShapefile = !!(shapefileId)

  return (
    <section className="echoform">
      <EDSCEchoform
        addBootstrapClasses
        defaultRawModel={rawModel}
        form={form}
        hasShapefile={hasShapefile}
        prepopulateValues={prepopulateValues}
        onFormModelUpdated={onFormModelUpdated}
        onFormIsValidUpdated={onFormIsValidUpdated}
      />
    </section>
  )
}

EchoForm.defaultProps = {
  rawModel: null,
  shapefileId: null
}

EchoForm.propTypes = {
  collectionId: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  methodKey: PropTypes.string.isRequired,
  rawModel: PropTypes.string,
  shapefileId: PropTypes.string,
  spatial: PropTypes.shape({}).isRequired,
  temporal: PropTypes.shape({}).isRequired,
  overrideTemporal: PropTypes.shape({}).isRequired,
  onUpdateAccessMethod: PropTypes.func.isRequired
}

export default EchoForm
