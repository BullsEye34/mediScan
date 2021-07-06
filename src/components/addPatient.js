import Navbar from "./Navbar";
import React, { Component } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Web3 from 'web3'
import {Link,} from 'react-router-dom'
import MediScan from '../abis/MediScan.json'


class AddPatient extends Component{
    
        
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

   onFormSubmit(e) {
    e.preventDefault()
     if(this.state.name===''||this.state.address===''||this.state.phone===''||this.state.nominee===''||
     this.state.medical===''||this.state.allergies===''){
       alert("Empty Fields!\n\n All Textfields are compulsory")
     }else{
       
    this.addPatient(
      this.state.name,
      this.state.address,
      this.state.phone,
      this.state.nominee,
      this.state.medical,
      this.state.allergies,
      );
     }
  }

  async addPatient( name,  address,  phno,  nominee,  medicalIssue,  allergies){
    //console.log(name+" "+address+" "+phno+" "+nominee+" "+medicalIssue+" "+allergies+" "+networkAddress)
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
      if((await mediScan.methods.Patients(this.state.netAddr).call())["patientAddress"]==="0x0000000000000000000000000000000000000000") {
        let newPatient = await mediScan.methods.createPatient(name, address, parseInt(phno), (nominee.split(";").toString()), (medicalIssue.split(";")).toString(), (allergies.split(";").toString()), this.state.netAddr).send({from: this.state.account})
        this.setState({newPatient})
        let patientCreated = await mediScan.methods.Patients(this.state.netAddr).call()
        console.log(patientCreated)
        this.props.history.push({
          pathname: '/qrCode',
          state: JSON.stringify({"address":this.state.netAddr})
        });
        
      }else{
        window.alert("User already Exists!")
        this.props.history.goBack();
      }

    } else {
      window.alert('MediScan contract not deployed to detected network.')
    }
    
  }


  constructor(props) {
    super(props)
    this.state = {
      newPatient: {},
      netAddr: '',
      name:'',
      phone:'',
      address:'',
      allergies:'',
      nominee:'',
      medical:'',

    }
    
  }


    render(){
        return(
            
            <div>
              <Navbar account={this.state.account}/>
             <center>
             <div className="adder">
              <Form onSubmit={(e)=>this.onFormSubmit()}>
              <Form.Group as={Row} controlId="name">
    <Form.Label column sm="2">
      Patient Name
    </Form.Label>
    <Col sm="10">
      <Form.Control 
            required value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} type="name" placeholder="Name" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="number">
    <Form.Label column sm="2">
       Phone Number
    </Form.Label>
    <Col sm="10">
      <Form.Control
            required value={this.state.phone} onChange={(e)=>this.setState({phone:e.target.value})} type="number" placeholder="Phone Number" />
    </Col>
  </Form.Group>
  
  <Form.Group as={Row} controlId="address">
    <Form.Label column sm="2">
      Residential Address
    </Form.Label>
    <Col sm="10">
    <Form.Control
            required as="textarea" value={this.state.address} onChange={(e)=>this.setState({address:e.target.value})} rows={3} placeholder="Residential Address" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="nominee">
    <Form.Label column sm="2">
       Nominee
    </Form.Label>
    <Col sm="10">
      <Form.Control
            required type="text" value={this.state.nominee} onChange={(e)=>this.setState({nominee:e.target.value})} placeholder="Nominee Name" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="allergies">
    <Form.Label column sm="2">
       Allergies
    </Form.Label>
    <Col sm="10">
      <Form.Control
            required value={this.state.allergies} onChange={(e)=>this.setState({allergies:e.target.value})} type="text" placeholder="Allergies" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="medicalIssues">
    <Form.Label column sm="2">
       Medical Issues
    </Form.Label>
    <Col sm="10">
      <Form.Control
            required value={this.state.medical} onChange={(e)=>this.setState({medical:e.target.value})} type="text" placeholder="Medical Issues" />
    </Col>
  </Form.Group>

  {/* <Form.Group as={Row} controlId="netAddr">
    <Form.Label column sm="2">
       Network Address
    </Form.Label>
    <Col sm="10">
      <Form.Control
            required value={this.state.netAddr} onChange={(e)=>this.setState({netAddr:e.target.value})} type="text" placeholder="0x123456......" />
    </Col>
  </Form.Group> */}
  <Link to={{pathname: "/added", state: this.state.netAddr}}  onClick={(e)=>this.onFormSubmit(e)}>
  <Button variant="primary" type="button" >
    Submit
  </Button>
  </Link>
</Form>
              </div>
             </center>
              </div>
        );
    }

}

export default AddPatient;