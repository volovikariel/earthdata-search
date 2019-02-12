import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Link,
  withRouter
} from 'react-router-dom'
import queryString from 'query-string'

import './CollectionResults.scss'

const mapStateToProps = state => ({
  collections: state.entities.collections
})

class CollectionResults extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      collections,
      location
    } = this.props

    let resultsHeading = <h3>Results</h3>

    if (collections.keyword) {
      resultsHeading = (
        <h3>
          Results for
          {` "${collections.keyword}"`}
        </h3>
      )
    }

    const collectionResults = collections.allIds.map((id) => {
      const collection = collections.byId[id]

      return (
        <li key={collection.id}>
          <p>{collection.dataset_id}</p>
          <Link to={{
            pathname: '/search/granules',
            search: queryString
              .stringify(
                Object.assign(
                  {},
                  queryString.parse(location.search),
                  { p: collection.id }
                )
              )
          }}
          >
            {collection.dataset_id}
          </Link>
          <p>{collection.id}</p>
          <p>{collection.summary}</p>
          <p>{collection.short_name}</p>
          <p>{collection.version_id}</p>
        </li>
      )
    })

    return (
      <div className="inner-panel">
        { !collections.isLoading ? resultsHeading : 'Loading...' }
        <ul>
          {collectionResults}
        </ul>
      </div>
    )
  }
}

CollectionResults.propTypes = {
  collections: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired
}

export default withRouter(
  connect(mapStateToProps, null)(CollectionResults)
)
