import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import configureStore from '../../../store/configureStore'

import SearchPanels from '../SearchPanels'
import Panels from '../../Panels/Panels'

const store = configureStore()

Enzyme.configure({ adapter: new Adapter() })

console.log(jest.requireActual('react-dom'))

jest.mock('react-dom', () => (
  {
    ...(jest.requireActual('react-dom')),
    createPortal: jest.fn(),
    unstable_createPortal: jest.fn()
  }
))

console.log('ReactDOM', ReactDOM)

beforeEach(() => {
  // jest.clearAllMocks()
  const div = document.createElement('div')
  div.setAttribute('id', 'root')
  document.body.appendChild(div)
  document.getElementById = jest.fn().mockImplementation((id) => {
    console.log('mocked get element by id', id)
    return id === 'root' ? 'root-dom' : null
  })
})

afterEach(() => {
  const div = document.getElementById('root')
  if (div) {
    document.body.removeChild(div)
  }
})

function setup(overrideProps, location = '/search') {
  const props = {
    collectionMetadata: {
      hasAllMetadata: true,
      title: 'Collection Title',
      isCwic: false
    },
    collectionQuery: {
      pageNum: 1,
      sortKey: ['']
    },
    collectionsSearch: {
      allIds: ['COLL_ID_1'],
      hits: 1,
      isLoading: false,
      isLoaded: true
    },
    granuleMetadata: {
      title: 'Granule Title'
    },
    granuleSearchResults: {
      allIds: [],
      hits: 0,
      isLoading: false,
      isLoaded: false
    },
    granuleQuery: {
      pageNum: 1,
      sortKey: '-start_date'
    },
    location: {
      pathname: '/search',
      search: ''
    },
    match: {
      url: '/search'
    },
    mapProjection: 'epsg4326',
    onApplyGranuleFilters: jest.fn(),
    onChangeQuery: jest.fn(),
    onMetricsCollectionSortChange: jest.fn(),
    onToggleAboutCwicModal: jest.fn(),
    onTogglePanels: jest.fn(),
    onSetActivePanel: jest.fn(),
    panels: {
      activePanel: '0.0.0',
      isOpen: true
    },
    preferences: {
      panelState: 'default',
      collectionListView: 'default',
      granuleListView: 'default'
    },
    portal: {
      portalId: 'edsc'
    },
    ...overrideProps
  }

  const enzymeWrapper = mount(
    <Provider store={store}>
      <StaticRouter location={location}>
        <SearchPanels {...props} />
      </StaticRouter>
    </Provider>
  )

  return {
    enzymeWrapper,
    props
  }
}

describe('SearchPanels component', () => {
  test.only('renders a Panels component for search page', () => {
    console.log('document.body', document.getElementById('root'))
    ReactDOM.createPortal = jest.fn(dropdown => dropdown)
    const { enzymeWrapper } = setup()
    console.log('enzymeWrapper', enzymeWrapper.debug())

    const panels = enzymeWrapper.find(Panels)
    expect(panels.props().show).toBeTruthy()
    expect(panels.props().activePanel).toEqual('0.0.0')
    expect(panels.props().draggable).toBeTruthy()
    expect(panels.props().panelState).toEqual('default')
  })

  test('renders a Panels component for granules page', () => {
    const { enzymeWrapper } = setup({}, '/search/granules')

    const panels = enzymeWrapper.find(Panels)
    expect(panels.props().show).toBeTruthy()
    expect(panels.props().activePanel).toEqual('0.1.0')
    expect(panels.props().draggable).toBeTruthy()
    expect(panels.props().panelState).toEqual('default')
  })

  test('renders a Panels component for collection details page', () => {
    const { enzymeWrapper } = setup({}, '/search/granules/collection-details')

    const panels = enzymeWrapper.find(Panels)
    expect(panels.props().show).toBeTruthy()
    expect(panels.props().activePanel).toEqual('0.2.0')
    expect(panels.props().draggable).toBeTruthy()
    expect(panels.props().panelState).toEqual('default')
  })

  test('renders a Panels component for granule details page', () => {
    const { enzymeWrapper } = setup({}, '/search/granules/granule-details')

    const panels = enzymeWrapper.find(Panels)
    expect(panels.props().show).toBeTruthy()
    expect(panels.props().activePanel).toEqual('0.3.0')
    expect(panels.props().draggable).toBeTruthy()
    expect(panels.props().panelState).toEqual('default')
  })

  describe('componentDidUpdate updates the state if the panelView props have changed', () => {
    const { enzymeWrapper, props } = setup()

    const newProps = {
      ...props,
      preferences: {
        ...props.preferences,
        collectionListView: 'table'
      }
    }
    // setProps only updates the props of the root component, so we need to update the children prop to get to SearchPanels
    enzymeWrapper.setProps({
      children: (
        <StaticRouter location="/search">
          <SearchPanels {...newProps} />
        </StaticRouter>
      )
    })

    expect(enzymeWrapper.find(SearchPanels).instance().state.collectionPanelView).toEqual('table')
  })

  test('onPanelClose calls onTogglePanels', () => {
    const { enzymeWrapper, props } = setup()

    enzymeWrapper.find(SearchPanels).instance().onPanelClose()
    expect(props.onTogglePanels).toHaveBeenCalledTimes(1)
    expect(props.onTogglePanels).toHaveBeenCalledWith(false)
  })

  test('onChangePanel calls onSetActivePanel', () => {
    const { enzymeWrapper, props } = setup()

    enzymeWrapper.find(SearchPanels).instance().onChangePanel('0.1.0')
    expect(props.onSetActivePanel).toHaveBeenCalledTimes(1)
    expect(props.onSetActivePanel).toHaveBeenCalledWith('0.1.0')
  })

  test('onChangeCollectionPanelView sets the state', () => {
    const { enzymeWrapper } = setup()

    enzymeWrapper.find(SearchPanels).instance().onChangeCollectionPanelView('table')

    expect(enzymeWrapper.find(SearchPanels).instance().state.collectionPanelView).toEqual('table')
  })

  test('onChangeGranulePanelView sets the state', () => {
    const { enzymeWrapper } = setup()

    enzymeWrapper.find(SearchPanels).instance().onChangeGranulePanelView('table')

    expect(enzymeWrapper.find(SearchPanels).instance().state.granulePanelView).toEqual('table')
  })

  test('updatePanelViewState sets the state', () => {
    const { enzymeWrapper } = setup()

    enzymeWrapper.find(SearchPanels).instance().updatePanelViewState({
      collectionPanelView: 'table'
    })

    expect(enzymeWrapper.find(SearchPanels).instance().state.collectionPanelView).toEqual('table')
    expect(enzymeWrapper.find(SearchPanels).instance().state.granulePanelView).toEqual('list')
  })
})
