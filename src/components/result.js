import Navbar from "./Navbar";
import React, { Component } from 'react'
import Web3 from 'web3'
import MediScan from '../abis/MediScan.json'
import {Form, Button, Row, Col} from 'react-bootstrap'

class Result extends Component{
        
        
  /// More like initState of Flutter
  async componentWillMount(){
    console.log(JSON.parse(this.props.location.state)['address']['text'])
    this.setState({netAddr: JSON.parse(this.props.location.state)['address']['text']})
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
        //let newPatient = await mediScan.methods.createPatient('P Vamshi Prasad', '284, 2nd main, new BDA Layout', 1234567890, 'NA', 'NA', 'NA', '0x1cCb76B390446c359ED1De49f0Bd8b25D418DA86').send({from: this.state.account}).call()
        let data = await mediScan.methods.Patients(this.state.netAddr).call();
        console.log(data)
        this.setState({data: data});
       
  
      } else {
        window.alert('MediScan contract not deployed to detected network.')
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
            <div>
              <Navbar account={this.state.account}/>
              <center>
             <div className="adder">
              <Form onSubmit={(e)=>this.onFormSubmit()}>

              <Form.Group as={Row} controlId="image">
              <Form.Label column sm="2">
      Patient Image
    </Form.Label>
    <Col sm="10">
    {/*<Form.Control 
            required as="textarea" value={(this.state.data==null)?"":"localhost:3000/"+this.state.data['image']} disabled={true} onChange={(e)=>this.setState({name:e.target.value})} type="image" placeholder="Image" />
    */}
<img src={(this.state.data==null)?"":"http://localhost:3000/public/images/"+this.state.data['image']} />
</Col>
  </Form.Group>

              <Form.Group as={Row} controlId="name">


    <Form.Label column sm="2">
      Patient Name
    </Form.Label>
    <Col sm="10">
      <Form.Control 
            required value={(this.state.data==null)?"":this.state.data['name']} disabled={true} onChange={(e)=>this.setState({name:e.target.value})} type="name" placeholder="Name" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="number">
    <Form.Label column sm="2">
       Phone Number
    </Form.Label>
    <Col sm="10">
      <Form.Control
            required value={(this.state.data==null)?"":this.state.data['phno']} disabled={true} onChange={(e)=>this.setState({phone:e.target.value})} type="number" placeholder="Phone Number" />
    </Col>
  </Form.Group>
  
  <Form.Group as={Row} controlId="address">
    <Form.Label column sm="2">
      Residential Address
    </Form.Label>
    <Col sm="10">
    <Form.Control
            required as="textarea" value={(this.state.data==null)?"":this.state.data['residenceAddress']} disabled={true} onChange={(e)=>this.setState({address:e.target.value})} rows={3} placeholder="Residential Address" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="nominee">
    <Form.Label column sm="2">
       Nominee
    </Form.Label>
    <Col sm="10">
      <Form.Control
            required as="textarea" type="text" value={(this.state.data==null)?"":this.state.data['nominees'].split(";")} disabled={true} onChange={(e)=>this.setState({nominee:e.target.value})} placeholder="Nominee Name" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="allergies">
    <Form.Label column sm="2">
       Allergies
    </Form.Label>
    <Col sm="10">
      <Form.Control
            required as="textarea" value={(this.state.data==null)?"":this.state.data['allergies'].split(";")} disabled={true} onChange={(e)=>this.setState({allergies:e.target.value})} type="text" placeholder="Allergies" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="medicalIssues">
    <Form.Label column sm="2">
       Medical Issues
    </Form.Label>
    <Col sm="10">
      <Form.Control
            required as="textarea" value={(this.state.data==null)?"":this.state.data['medicalIssues'].split(";")} disabled={true} onChange={(e)=>this.setState({medical:e.target.value})} type="text" placeholder="Medical Issues" />
    </Col>
  </Form.Group>

  <p>Created By : {(this.state.data==null)?"":this.state.data['creatorAddress']}</p>
  <center><Button onClick={(e)=>this.props.history.push({
          pathname: '/'})
        } className='noprint' style={{color: 'white', marginTop:50, borderRadius: 10, backgroundColor:'blue', height: 50, width: 100, justifyContent: 'center'}}>
DONE!
</Button></center>  
</Form>
              </div>
             </center>
            </div>
        );
    }

}

export default Result;