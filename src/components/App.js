import React, { Component } from 'react'
import {
  Route,
} from "react-router-dom";
import AddPatient from './addPatient';

import Home from './home'
import ScanPatient from './scanPatient';


class App extends Component {


  render() {
    return (
      <div>
        <Route exact path="/" component={Home}></Route>
      <Route exact path="/scan" component={ScanPatient}></Route>
      <Route exact path="/add" component={AddPatient}></Route>
      </div>
    );
  }
  
}

export default App;
