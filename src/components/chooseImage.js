import Navbar from "./Navbar";
import React, { Component } from 'react'
import Web3 from 'web3'
import MediScan from '../abis/MediScan.json'

class ChooseImage extends Component{

            
  /// More like initState of Flutter
  async componentWillMount(){
      
    console.log(this.props.location.state)
    this.setState({netAddr:this.props.location.state})
    await this.loadWeb3()
    await this.loadAccount()
    await this.loadData()
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

  async loadData(){
    const web3 = window.web3
    const networkID = await web3.eth.net.getId()
    console.log(networkID)
    const MediScanData = MediScan.networks[networkID]

    if(MediScanData) {
      const mediScan = new web3.eth.Contract(MediScan.abi, MediScanData.address)
      this.setState({ mediScan })
      let patientCreated = await mediScan.methods.Patients(this.props.location.state).call()
      console.log(patientCreated)
      this.setState({patientCreated})

    } else {
      window.alert('MediScan contract not deployed to detected network.')
    }
    
  }

    

  constructor(props) {
    super(props)
    this.state = {
      newPatient: {},
      netAddr: '',
      patientCreated:{}

    }
  }
    render(){
        return(
            <div>
                <Navbar account={this.state.account}/>
                <center>
                <div className="imageCard">
                    <div className="actualCards">
                        Capture
                    </div>
                    <div className="actualCards">
                        Upload
                    </div>
                </div>
                </center>
            </div>
        );
    }
}

export default ChooseImage;