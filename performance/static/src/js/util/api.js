const url = 'http://localhost:3001/api/v1/collections.json'

export default class Api {
  static getCollections(query = false) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest()

      req.open('GET', `${url}${query ? `/?keyword=${query}` : ''}`)

      req.onload = () => {
        if (req.status === 200) {
          resolve(JSON.parse(req.response))
        } else {
          reject(Error('Network Error'))
        }
      }

      req.onerror = () => {
        reject(Error('Network Error'))
      }

      req.send()
    })
  }
}
