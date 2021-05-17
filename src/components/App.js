import React, { Component } from 'react'
import Navbar from './Navbar'
import './App.css'

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
  }

  /// Function to Load Web3
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '0x0'
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        
      </div>
    );
  }
}

export default App;
