import { getEarthdataConfig } from '../../../../sharedUtils/config'
import { cmrEnv } from '../../../../sharedUtils/cmrEnv'

/**
 * @typedef {Object} GranuleListInfo
 * @property {Array} granulesList - An array of formatted granule info
 * @property {Boolean} hasBrowseImagery - Flag to detirmine if any of the granules have browse imagery defined
 */

/**
 * Formats granule results
 * @param {Object} granules - The granules from the redux store.
 * @param {Array} granuleIds - Granule IDs to return in the list.
 * @param {String} focusedGranule - The focused granule.
 * @returns {GranuleListInfo} - The return object
 */
export const formatGranulesList = (
  granules,
  granuleIds,
  focusedGranule,
  getDataLinks,
  handleClick,
  handleMouseEnter,
  handleMouseLeave
) => granuleIds.map((granuleId) => {
  const granule = granules.byId[granuleId]

  const original = granule

  const isFocused = focusedGranule === granuleId

  const { cmrHost } = getEarthdataConfig(cmrEnv())
  const browseUrl = `${cmrHost}/browse-scaler/browse_images/datasets/${granuleId}`
  const {
    browse_flag: browseFlag,
    day_night_flag: dayNightFlag,
    formatted_temporal: formattedTemporal,
    id,
    links,
    online_access_flag: onlineAccessFlag,
    original_format: originalFormat,
    producer_granule_id: producerGranuleId,
    thumbnail: granuleThumbnail,
    title: granuleTitle
  } = granule

  const title = producerGranuleId || granuleTitle
  const temporal = formattedTemporal
  const [timeStart, timeEnd] = temporal
  const thumbnail = browseFlag ? granuleThumbnail : false

  const isFocusedGranule = isFocused || focusedGranule === id

  return {
    browseFlag,
    browseUrl,
    dayNightFlag,
    formattedTemporal,
    id,
    links,
    onlineAccessFlag,
    original,
    originalFormat,
    producerGranuleId,
    granuleThumbnail,
    title,
    temporal,
    timeStart,
    timeEnd,
    thumbnail,
    isFocusedGranule,
    getDataLinks,
    handleClick,
    handleMouseEnter,
    handleMouseLeave
  }
})
