import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useLocation} from 'react-router-dom';

const Header = () =>{
    return (
        <><h2>PlateBuilder</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li><Link to={'/plate'} className="nav-link"> 96 Plate </Link></li>
          <li><Link to={'/plate384'} className="nav-link"> 384 Plate </Link></li>
          <li><Link to={'/plate1536'} className="nav-link"> 1536 Plate </Link></li>
          <li><Link to={'/barcodes'} className="nav-link">Barcodes</Link></li>
        </ul>
        </nav>
        <hr />
    </>
    );
}

export default Header;