import { cmrEnv } from '../../../../../sharedUtils/cmrEnv'
import {
  getEarthdataConfig,
  getEnvironmentConfig
} from '../../../../../sharedUtils/config'
import Request from './request'

/**
 * Request object for browse scaler requests
 */
export default class BrowseScalerRequest extends Request {
  constructor(authToken) {
    const cmrEnvironment = cmrEnv()

    if (authToken && authToken !== '') {
      super(getEnvironmentConfig().apiHost)

      this.authenticated = true
      this.authToken = authToken
      this.searchPath = 'browse_scaler'
    } else {
      super(getEarthdataConfig(cmrEnvironment).cmrHost)

      this.searchPath = 'browse-scaler/browse_images'
    }
  }

  permittedCmrKeys() {
    return [
      'h',
      'w'
    ]
  }

  fetch(conceptType, conceptId, height, width) {
    return this.get(`${this.searchPath}/${conceptType}/${conceptId}`, {
      h: height,
      w: width
    }, {
      responseType: 'arraybuffer'
    })
  }
}
