import React from 'react'
import ReactDOM from 'react-dom'


import App from './js/App'

import './css/main.scss'

const wrapper = document.getElementById('root')

if (wrapper) {
  ReactDOM.render(
    <App />,
    wrapper
  )
}
