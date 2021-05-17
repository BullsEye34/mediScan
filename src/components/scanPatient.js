import Navbar from "./Navbar";
import React, { Component } from 'react'
import Web3 from 'web3'

class ScanPatient extends Component{
        
        
  /// More like initState of Flutter
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadAccount()
  }

  async loadAccount(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})

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
      account: '0x0',
    }
  }

    render(){
        return(
            <Navbar account={this.state.account}/>
        );
    }

}

export default ScanPatient;