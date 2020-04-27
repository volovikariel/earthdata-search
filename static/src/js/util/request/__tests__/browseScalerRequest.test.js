import Request from '../request'
import BrowseScalerRequest from '../browseScalerRequest'
import * as getEarthdataConfig from '../../../../../../sharedUtils/config'

beforeEach(() => {
  jest.restoreAllMocks()
  jest.clearAllMocks()
})

describe('BrowseScalerRequest#constructor', () => {
  test('sets the default values when authenticated', () => {
    const token = '123'
    const request = new BrowseScalerRequest(token)

    expect(request.authenticated).toBeTruthy()
    expect(request.authToken).toEqual(token)
    expect(request.baseUrl).toEqual('http://localhost:3000')
    expect(request.searchPath).toEqual('browse_scaler')
  })

  test('sets the default values when unauthenticated', () => {
    jest.spyOn(getEarthdataConfig, 'getEarthdataConfig').mockImplementation(() => ({ cmrHost: 'https://cmr.earthdata.nasa.gov' }))

    const request = new BrowseScalerRequest()

    expect(request.authenticated).toBeFalsy()
    expect(request.baseUrl).toEqual('https://cmr.earthdata.nasa.gov')
    expect(request.searchPath).toEqual('browse-scaler/browse_images')
  })
})

describe('BrowseScalerRequest#permittedCmrKeys', () => {
  test('returns an array of browse scaler keys', () => {
    const request = new BrowseScalerRequest()

    expect(request.permittedCmrKeys()).toEqual([
      'h',
      'w'
    ])
  })
})

describe('BrowseScalerRequest#nonIndexedKeys', () => {
  test('returns an array of browse scaler keys', () => {
    const request = new BrowseScalerRequest()

    expect(request.nonIndexedKeys()).toEqual([])
  })
})

describe('BrowseScalerRequest#fetch', () => {
  test('calls Request#get', () => {
    const token = '123'
    const request = new BrowseScalerRequest(token)

    const getMock = jest.spyOn(Request.prototype, 'get').mockImplementation()

    request.fetch('datasets', 'C10000001-EDSC', 200, 200)

    expect(getMock).toBeCalledTimes(1)
    expect(getMock).toBeCalledWith('browse_scaler/datasets/C10000001-EDSC', { h: 200, w: 200 }, { responseType: 'arraybuffer' })
  })
})
