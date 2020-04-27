import axios from 'axios'
import { buildParams } from '../util/cmr/buildParams'
import { cmrEnv } from '../../../sharedUtils/cmrEnv'
import { getEarthdataConfig, getApplicationConfig, getClientId } from '../../../sharedUtils/config'
import { getEchoToken } from '../util/urs/getEchoToken'
import { getJwtToken } from '../util/getJwtToken'

/**
 * Perform an authenticated CMR Granule search
 * @param {Object} event Details about the HTTP request that it received
 */
const fetchBrowseImage = async (event, context) => {
  // https://stackoverflow.com/questions/49347210/why-aws-lambda-keeps-timing-out-when-using-knex-js
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false

  const jwtToken = getJwtToken(event)
  const accessToken = await getEchoToken(jwtToken)

  const { pathParameters, queryStringParameters } = event

  // Whitelist parameters supplied by the request
  const permittedCmrKeys = [
    'h',
    'w'
  ]

  const {
    conceptId,
    conceptType
  } = pathParameters

  const { defaultResponseHeaders } = getApplicationConfig()

  const response = await axios.get(`${getEarthdataConfig(cmrEnv()).cmrHost}/browse-scaler/browse_images/${conceptType}/${conceptId}`, {
    params: buildParams({
      body: JSON.stringify({
        params: queryStringParameters
      }),
      permittedCmrKeys
    }),
    headers: {
      'Client-Id': getClientId().lambda,
      'Echo-Token': accessToken
    },
    resolveWithFullResponse: true,
    time: true,
    responseType: 'arraybuffer'
  })

  const { data, status } = response

  return {
    isBase64Encoded: true,
    headers: defaultResponseHeaders,
    statusCode: status,
    body: data
  }
}

export default fetchBrowseImage
