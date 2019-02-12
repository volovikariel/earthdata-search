import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './FacetsSection.scss'

const mapStateToProps = state => ({
  facets: state.entities.facets
})

const FacetsList = (props) => {
  const { facets } = props
  const list = facets.map((child, i) => {
    if (i < 50) {
      return (
        <li key={child.title}>
          {child.title}
        </li>
      )
    }
    console.warn('trimmed')
    return null
  })

  return (
    <ul>
      {list}
    </ul>
  )
}

class FacetsGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle() {
    this.setState(state => ({ isOpen: !state.isOpen }))
  }

  render() {
    const { facet } = this.props
    const { isOpen } = this.state

    return (
      <li className="facets-section__facet" key={facet.title}>
        <h3 className="facets-section__facet-heading">
          <button
            className="btn btn-block facets-section__facet-button"
            type="button"
            onClick={this.onToggle}
          >
            <span className="facets-section__facet-title">{facet.title}</span>
            <div className="facets-section__facet-action">
              {
                !isOpen
                  ? (
                    <i className="fa fa-chevron-left">
                      <span className="visually-hidden">Open</span>
                    </i>
                  ) : (
                    <i className="fa fa-chevron-down">
                      <span className="visually-hidden">Close</span>
                    </i>
                  )
              }
            </div>
          </button>
        </h3>
        <div className={`facets-section__facet-group
          ${isOpen ? ' facets-section__facet-group--is-open' : ''}`}
        >
          <FacetsList facets={facet.children} />
        </div>
      </li>
    )
  }
}

const FacetsSection = (props) => {
  const { facets } = props

  const facetsGroup = facets.allIds.map((id) => {
    const facet = facets.byId[id]

    return (
      <FacetsGroup key={facet.title} facet={facet} />
    )
  })

  const featuresFacet = {
    title: 'Features',
    children: [
      {
        title: 'Map Imagery'
      },
      {
        title: 'Near Real Time'
      },
      {
        title: 'Customizable'
      }
    ]
  }

  return (
    <section className="facets-section">
      <ul className="facets-section__facets">
        <FacetsGroup facet={featuresFacet} />
        {facetsGroup}
      </ul>
    </section>
  )
}

FacetsSection.propTypes = {
  facets: PropTypes.shape({}).isRequired
}

FacetsList.propTypes = {
  facets: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired
}

FacetsGroup.propTypes = {
  facet: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps, null)(FacetsSection)
