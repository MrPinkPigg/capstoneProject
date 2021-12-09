
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Plate from './components/Plate';
import Barcodes from './components/Barcodes';
import logo from './logo.svg';
import './App.css';
var row = 12;
var col = 8;
class App extends Component{
  render() {
    return (
      <Router>
        <div>
          <h2>PlateBuilder</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/plate'} className="nav-link"> 96 Plate </Link></li>
            <li><Link to={'/plate384'} className="nav-link"> 384 Plate </Link></li>
            <li><Link to={'/plate1536'} className="nav-link"> 1536 Plate </Link></li>
            <li><Link to={'/barcodes'} className="nav-link">Barcodes</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
            <Route path='/plate' render={(props)=><Plate {...props} row='12' col='8'/>} />
            <Route path='/plate384' render={(props)=><Plate {...props} row='24' col='16'/>} />
            <Route path='/plate1536' render={(props)=><Plate {...props} row='64' col='24'/>} />
            <Route path='/barcodes' render={()=><Barcodes/>} />
          </Switch>
        </div>
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
