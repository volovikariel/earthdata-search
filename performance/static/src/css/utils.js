const path = require('path')

const resources = [
  '_base.scss',
  '_colors.scss',
  '_layout.scss'
]

module.exports = resources.map(file => path.resolve(__dirname, file))
