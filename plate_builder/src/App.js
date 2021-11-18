
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Plate from './components/Plate';
import Barcodes from './components/Barcodes';
import logo from './logo.svg';
import './App.css';

class App extends Component{
  render() {
    return (
      <Router>
        <div>
          <h2>PlateBuilder</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/plate'} className="nav-link"> Plate </Link></li>
            <li><Link to={'/barcodes'} className="nav-link">Barcodes</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
            <Route path='/plate' render={(props)=><Plate {...props} row='12' col='8'/>} />
            <Route path='/barcodes' render={()=><Barcodes/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
