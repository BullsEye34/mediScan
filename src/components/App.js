import React, { Component } from 'react'
import {
  Route,
} from "react-router-dom";
import AddPatient from './addPatient';

import Home from './home'
import ScanPatient from './scanPatient';
import ChooseImage from './chooseImage';
import QRCodee from './QRCode';
import Result from './result';


class App extends Component {


  render() {
    return (
      <div>
        <Route exact path="/" component={Home}></Route>
      <Route exact path="/scan" component={ScanPatient}></Route>
      <Route exact path="/add" component={AddPatient}></Route>
      <Route exact path="/added" component={ChooseImage} ></Route>
      <Route exact path="/qrCode" component={QRCodee} ></Route>
      <Route exact path="/result" component={Result} ></Route>
      </div>
    );
  }
  
}

export default App;
