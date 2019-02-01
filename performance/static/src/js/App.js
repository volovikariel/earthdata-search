import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'

import store from './store/configureStore'
import history from './util/history'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Home from './routes/Home/Home'
import Project from './routes/Project/Project'

// Create the root App component
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="container">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Earthdata Search</title>
            </Helmet>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/project" component={Project} />
            </Switch>
            <Footer />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
