import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import actions from '../../actions/index'

import './Header.scss'

const mapDispatchToProps = dispatch => ({
  addClick: () => {
    dispatch(actions.addClick(1))
  },
  getCollections: (query) => {
    dispatch(actions.getCollections(query))
  }
})

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleSearchBlur = this.handleSearchBlur.bind(this)
  }

  handleAddClick(event) {
    event.preventDefault()
    const { addClick } = this.props
    addClick()
  }

  handleSearchBlur(event) {
    const { getCollections } = this.props
    getCollections(event.target.value)
  }

  render() {
    return (
      <header className="header">
        <ul className="header__menu">
          <li className="header__menu-item">
            <h1 className="header__menu-title">
              <Link
                className="header__menu-link"
                to="/"
              >
                  Earthdata Search
              </Link>
            </h1>
          </li>
          <li className="header__menu-item">
            <Link
              className="header__menu-link"
              to="/project"
            >
                Project
            </Link>
          </li>
          <li>
            <input type="text" placeholder="Search" onBlur={this.handleSearchBlur} />
          </li>
        </ul>
        <div>
          <button type="button" onClick={this.handleAddClick}>Click Me</button>
        </div>
        <div>
          <span>Test</span>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  addClick: PropTypes.func.isRequired,
  getCollections: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Header)
