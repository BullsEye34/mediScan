import Navbar from "./Navbar";
import React, { Component } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Web3 from 'web3'
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

  async addPatient( name,  address,  phno,  nominee,  medicalIssue,  allergies,  networkAddress){
    const web3 = window.web3
    const networkID = await web3.eth.net.getId()
    console.log(networkID)
    const MediScanData = MediScan.networks[networkID]

    if(MediScanData) {
      const mediScan = new web3.eth.Contract(MediScan.abi, MediScanData.address)
      this.setState({ mediScan })
      let newPatient = await mediScan.methods.createPatient(name, address, phno, nominee, medicalIssue, allergies, networkAddress).call()
      this.setState({newPatient})
      this.setState({netAddr: networkAddress})

    } else {
      window.alert('MediScan contract not deployed to detected network.')
    }
    
  }


  constructor(props) {
    super(props)
    this.state = {
      newPatient: {},
      netAddr: '0x0'
    }
  }


    render(){
        return(
            
            <div>
              <Navbar account={this.state.account}/>
             <center>
             <div className="adder">
              <Form>
              <Form.Group as={Row} controlId="name">
    <Form.Label column sm="2">
      Patient Name
    </Form.Label>
    <Col sm="10">
      <Form.Control type="name" placeholder="Name" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="number">
    <Form.Label column sm="2">
       Phone Number
    </Form.Label>
    <Col sm="10">
      <Form.Control type="number" placeholder="Phone Number" />
    </Col>
  </Form.Group>
  
  <Form.Group as={Row} controlId="address">
    <Form.Label column sm="2">
      Residential Address
    </Form.Label>
    <Col sm="10">
    <Form.Control as="textarea" rows={3} placeholder="Residential Address" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="nominee">
    <Form.Label column sm="2">
       Nominee
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" placeholder="Nominee Name" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="allergies">
    <Form.Label column sm="2">
       Allergies
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" placeholder="Allergies" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="medicalIssues">
    <Form.Label column sm="2">
       Medical Issues
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" placeholder="Medical Issues" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="netAddr">
    <Form.Label column sm="2">
       Network Address
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" placeholder="0x123456......" />
    </Col>
  </Form.Group>
  <Button variant="primary" type="submit" onClick="">
    Submit
  </Button>
</Form>
              </div>
             </center>
              </div>
        );
    }

}

export default AddPatient;