import Navbar from "./Navbar";
import React, { Component } from 'react'
import QRCode from "react-qr-code";
import Web3 from 'web3';
import './App.css'

class QRCodee extends Component{
    /// More like initState of Flutter
  async componentWillMount(){
    this.setState({data:this.props.location.state})
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
          data: '',
        }
      }
      render(){
        return(
            <div>
           <div className='noprint' >
           <Navbar account={this.state.account}/>
           </div>
           <center><h1>MediScan Regitration Successful!</h1></center>
                <center><QRCode value={this.state.data} className='qrc' /></center>
                
<center><div onClick={(e)=>this.props.history.push({
          pathname: '/'})
        } className='noprint' style={{color: 'white', marginTop:50, borderRadius: 10, backgroundColor:'blue', height: 50, width: 100, justifyContent: 'center'}}>
DONE!
</div></center>  
            </div>
          
);
    }
}


export default QRCodee;