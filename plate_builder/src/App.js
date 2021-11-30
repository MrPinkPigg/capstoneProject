
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
            {/* These are the links to each page */}
            <li><Link to={'/plate'} className="nav-link"> Plate </Link></li>
            <li><Link to={'/barcodes'} className="nav-link">Barcodes</Link></li>
          </ul>
          </nav>
          <hr />
          {/* These are the actual paths that the app takes, when clicking different links */}
          <Switch>
            {/* Path to a single plate (12 rows, 8 cols) by passing these values into the props of the functional component */}
            <Route path='/plate' render={(props)=><Plate {...props} row='12' col='8'/>} />
            {/* Path to the list of barcodes */}
            <Route path='/barcodes' render={()=><Barcodes/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
