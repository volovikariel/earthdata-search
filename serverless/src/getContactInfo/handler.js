import { getDbConnection } from '../util/database/getDbConnection'
import { isWarmUp } from '../util/isWarmup'
import { getJwtToken } from '../util/getJwtToken'
import { getVerifiedJwtToken } from '../util/getVerifiedJwtToken'

/**
 * Handler for retreiving a users contact information
 */
const getContactInfo = async (event) => {
  // Prevent execution if the event source is the warmer
  if (await isWarmUp(event)) return false

  const jwtToken = getJwtToken(event)
  const { id } = getVerifiedJwtToken(jwtToken)

  // Retrive a connection to the database
  const dbConnection = await getDbConnection()

  try {
    const userRecord = await dbConnection('users')
      .select(
        'echo_preferences',
        'urs_profile',
      )
      .where({
        id
      })

    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(userRecord[0])
    }
  } catch (error) {
    console.log('getContactInfo error', error)

    return {
      isBase64Encoded: false,
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ errors: [error] })
    }
  }
}

export default getContactInfo
