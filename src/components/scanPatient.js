import Navbar from "./Navbar";
import React, { Component } from 'react'
import Web3 from 'web3'
import QrReader from 'react-qr-scanner'

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
      account: '0x0',delay: 100,
      result: 'No result',
    }
    this.handleScan = this.handleScan.bind(this)
  }

  handleScan(data){
    this.setState({
      result: data,
    })
    if(this.state.result!=null)
    this.props.history.push({
      pathname: '/result',
      state: JSON.stringify({"address":this.state.result})
    });
  }
  handleError(err){
    console.error(err)
  }
    render(){
        return(
            <div>
              <Navbar account={this.state.account}/>
            <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{JSON.stringify(this.state.result)}</p>
            </div>
        );
    }

}

export default ScanPatient;