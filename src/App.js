import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from './Search'
import BorrowerManagement from './BorrowerManagement'
import Checkin from './Checkin'
import Fine from './Fine'
import Checkout from './Checkout'
import Nav from './Nav'
import ImportData from './ImportData'
import './App.css';

// const React = require('react');
// const ReactDOM = require('react-dom');

class App extends React.Component {
    render() {
        return (
          <div className="App">
            <Router>
              <div>
              <Nav />
              <Switch>
                <Route path='/' exact={true} component={Search}/>
                <Route path='/borrowerManagement' exact={true} component={BorrowerManagement}/>
                <Route path='/checkin' exact={true} component={Checkin}/>
                <Route path="/checkout" exact={true} component={Checkout}/>
                <Route path='/fine' exact={true} component={Fine}/>
                <Route path='/importdata' exact={true} component={ImportData}/>
              </Switch>
              </div>
            </Router>
            </div>
        )
      }
}


export default App;