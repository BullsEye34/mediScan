import Navbar from "./Navbar";
import React, { Component } from 'react'
import QRCode from "react-qr-code";
import Web3 from 'web3';
import './App.css'
import MediScan from '../abis/MediScan.json'

class QRCodee extends Component{
    /// More like initState of Flutter
  async componentWillMount(){
    this.setState({data:this.props.location.state})
    await this.loadWeb3()
    await this.loadAccount()
    await this.createAccount()
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

  async createAccount(){
    let name = JSON.parse(JSON.parse(this.props.location.state)['prevData'])['name'];
    let address = JSON.parse(JSON.parse(this.props.location.state)['prevData'])['Resaddress'];
    let phno = JSON.parse(JSON.parse(this.props.location.state)['prevData'])['phno'];
    let nominee = JSON.parse(JSON.parse(this.props.location.state)['prevData'])['nominee'];
    let medicalIssue = JSON.parse(JSON.parse(this.props.location.state)['prevData'])['medicalIssue'];
    let allergies = JSON.parse(JSON.parse(this.props.location.state)['prevData'])['allergies'];
    let image = JSON.parse(this.props.location.state)['image'];
    const web3 = window.web3
    const networkID = await web3.eth.net.getId()
    console.log(networkID)
    const MediScanData = MediScan.networks[networkID]

    if(MediScanData) {
      const mediScan = new web3.eth.Contract(MediScan.abi, MediScanData.address)
      this.setState({ mediScan })
      //let newPatient = await mediScan.methods.createPatient('P Vamshi Prasad', '284, 2nd main, new BDA Layout', 1234567890, 'NA', 'NA', 'NA', '0x1cCb76B390446c359ED1De49f0Bd8b25D418DA86').send({from: this.state.account}).call()
      let accountsArray = await web3.eth.getAccounts();
      let newAccount = web3.eth.accounts.create();
      accountsArray.push(newAccount.address)
      this.setState({netAddr:newAccount.address})
      console.log("New Account: "+this.state.netAddr)
      
      let newPatient = await mediScan.methods.createPatient(name, address, parseInt(phno), (nominee.split(";").toString()), (medicalIssue.split(";")).toString(), (allergies.split(";").toString()), image, this.state.netAddr).send({from: this.state.account})
        this.setState({newPatient})
        let patientCreated = await mediScan.methods.Patients(this.state.netAddr).call()
        console.log(patientCreated)
        
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
                <center>{this.state.newPatient==null?<br/>:<QRCode value={this.state.netAddr} className='qrc' />}</center>
                
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