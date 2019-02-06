import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  facets: state.entities.facets
})

const SidebarFacets = (props) => {
  const { facets } = props

  const facetsResults = facets.allIds.map((id) => {
    const facet = facets.byId[id]

    return (
      <li key={facet.field}>
        {facet.field}
      </li>
    )
  })

  return (
    <ul>
      {facetsResults}
    </ul>
  )
}

SidebarFacets.propTypes = {
  facets: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps, null)(SidebarFacets)
