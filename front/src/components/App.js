import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { 
    HashRouter as Router, 
    Switch, 
    Route
 } from 'react-router-dom'

import {Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Login from './accounts/Login'
import Register from './accounts/Register'
// eslint-disable-next-line
import PrivateRoute from './common/PrivateRoute'

import Header from './layout/Header'
import Alerts from './layout/Alerts'
import Dashboard from './leads/Dashboard'

import {loadUser} from '../actions/auth'

import {Provider} from 'react-redux'
import store from './store'


// The Alert options
const alertOptions = { 
    timeout: 3000,
    position: 'top center'
}

class App extends Component {
    componentDidMount(){
        store.dispatch(loadUser())
    }

    render(){
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Router>
                    <Fragment>
                    <Header />
                    <Alerts />
                    <div className="container">
                        <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        </Switch>
                    </div>
                    </Fragment>
                </Router>
                </AlertProvider>
            </Provider>
        )
    }
    
}

ReactDOM.render(<App />, document.getElementById('root'))

//https://www.valentinog.com/blog/drf/#Django_REST_with_React_Django_and_React_together
//http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/
//https://www.django-rest-framework.org/api-guide/viewsets/
//https://bootswatch.com/
//https://github.com/bradtraversy/lead_manager_react_django/blob/master/leadmanager/frontend/src/components/leads/Dashboard.js
//https://getbootstrap.com/docs/5.0/components/navbar/