
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useLocation} from 'react-router-dom';
import { Redirect } from "react-router";
import Plate from './components/Plate';
import Barcodes from './components/Barcodes';
import Header from './components/Header'
import Login from './components/Login'
import logo from './logo.svg';
import './App.css';
var row = 12;
var col = 8;
class App extends Component{
  render() {
    this.state = { isAuthenticated: false };
    return (
      <Router>
          {/* These are the actual paths that the app takes, when clicking different links */}
        <Switch>
            {/* Path to a single plate (12 rows, 8 cols) by passing these values into the props of the functional component */}
            <Route exact path="/" component={Login} />
          <div>
            <Header />
            <Route path='/plate' render={(props)=><Plate {...props} row='12' col='8'/>} />
            <Route path='/plate384' render={(props)=><Plate {...props} row='24' col='16'/>} />
            <Route path='/plate1536' render={(props)=><Plate {...props} row='64' col='24'/>} />
            <Route path='/barcodes' render={()=><Barcodes/>} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export const tableSize = () => {
  var size = document.getElementById('tablesize')
  if (size.value == '96') {
    row = 12
    col = 8
  }
  else if (size.value = '384') {
    row = 24
    col = 16
  }
  else if (size.value = '1536') {
    row = 64
    col = 24
  }
}

export default App;
