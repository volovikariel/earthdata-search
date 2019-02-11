import React from 'react'
import ReactDOM from 'react-dom'


import App from './js/App'

import './css/main.scss'
import './css/vendor/bootstrap/utils.scss'

const wrapper = document.getElementById('root')

if (wrapper) {
  ReactDOM.render(
    <App />,
    wrapper
  )
}
