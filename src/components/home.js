import React, { Component } from 'react'
import Navbar from './Navbar'
import './App.css'
import {Jumbotron, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import Web3 from 'web3'
import MediScan from '../abis/MediScan.json'
class Home extends Component{
    
  /// More like initState of Flutter
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadAccount()
  }

  async loadAccount(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})

    const networkID = await web3.eth.net.getId()
    console.log(networkID)
    const MediScanData = MediScan.networks[networkID]

    if(MediScanData) {
      const mediScan = new web3.eth.Contract(MediScan.abi, MediScanData.address)
      this.setState({ mediScan })
      let Patients = await mediScan.methods.Patients(this.state.account).call()
      this.setState({Patients})
      console.log(Patients)

    } else {
      window.alert('MediScan contract not deployed to detected network.')
    }

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
      mediScan: {},
      Patients: {},
    }
  }
    render(){
        return(
            <div>
          <Navbar account={this.state.account} />
         <div className='cardsa'>
         <div className='actualCard'>
         <Link to="/scan"><Jumbotron fluid>
    <Container>
      <h1 style={{textAlign:'center', }}>Scan Code</h1>
      <p style={{textAlign:'center', }}>
        Press me to scan a new code
      </p>
    </Container>
  </Jumbotron></Link>
             </div>
  <div className='actualCard'>
  <Jumbotron fluid>
    <Container>
      <h1 style={{textAlign:'center', }}>Add New Patient</h1>
      <p style={{textAlign:'center', }}>
        Press me to add a new Patient
      </p>
    </Container>
  </Jumbotron>
  </div>
         </div>
          
        </div>
        );
    }
}

export default Home;