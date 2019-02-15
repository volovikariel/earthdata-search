const StaticWebpackConfig = require('./static.webpack.config.js')
const ServerlessWebpackConfig = require('./serverless.webpack.config.js')

module.exports = [
  StaticWebpackConfig,
  ServerlessWebpackConfig
]
