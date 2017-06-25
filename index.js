import React from 'react'
import {render} from 'react-dom'
import {Route, HashRouter as Router, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import FirebaseUtil from './script/FirebaseUtil'

import {Layout, Home, AddAnimal, AnimalDetail, AnimalPage, ContactUs, Login, Notification, UserProfile} from './app/page'
import AppHead from './app/component/AppHead'

import reducer from './app/redux/reducer/reducer'

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const Root = () => (
    <Provider store={store}>
        <Layout>
        <Router>
            <div>                
                <Route exact path='/' component={Home} />
                <Route exact path='/addanimal' component={AnimalDetail} />
                <Route exact path='/animaldetail/:id' component={AnimalDetail} />
                <Route exact path='/animalpage/:type' component={AnimalPage} />                
                <Route exact path='/contactus' component={ContactUs} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/notification' component={Notification} />
                <Route exact path='/myprofile' component={UserProfile} />
            </div>
        </Router>
    </Layout>        
    </Provider>
)

FirebaseUtil.initialApp(store)
render(<Root />, document.getElementById('app'))