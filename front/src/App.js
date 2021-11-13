import './App.css';
import React, { Component, Fragment } from 'react'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import {Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Login from './components/accounts/Login'
import Register from './components/accounts/Register'

import PrivateRoute from './components/common/PrivateRoute'

import Header from './components/layout/Header'
import Alerts from './components/layout/Alerts'
import Dashboard from './components/leads/Dashboard'


import {Provider} from 'react-redux'
import store from './components/store'


// The Alert options
const alertOptions = { 
    timeout: 3000,
    position: 'top center'
}

class App extends Component {

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
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/register" component={Register} />
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </AlertProvider>
            </Provider>
        )
    }
    
}

export default App;
