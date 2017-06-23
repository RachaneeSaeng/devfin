import React from 'react'
import {render} from 'react-dom'
import {Route, HashRouter as Router, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import {Home, AddAnimal, AnimalDetail, AnimalPage, AnimalTimeline, ContactUs, Login, Notification, UserProfile} from './app/page'
import AppHead from './app/component/AppHead'

import reducer from './app/redux/reducer/reducer'

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const Root = () => (
    <Provider store={store}>
        <Router>
            <div>
                <Route path='/' component={AppHead} />
                <Route exact path='/' component={Home} />
                <Route exact path='/animal' component={AnimalPage} />
            </div>
        </Router>
    </Provider>
)

render(<Root />, document.getElementById('app'))
