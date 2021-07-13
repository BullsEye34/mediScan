import Navbar from "./Navbar";
import React, { Component } from 'react'
import Web3 from 'web3'
import MediScan from '../abis/MediScan.json'
import FileBase64 from 'react-file-base64';
import { Link } from "react-router-dom";
import axios from "axios";
import {Button} from 'react-bootstrap'

class ChooseImage extends Component{
  custom_file_upload_url = `http://192.168.0.14:3080/upload/post`;

            
  /// More like initState of Flutter
  async componentWillMount(){
      
    //this.setState({netAddr:this.props.location.state})
    this.setState({prevData: this.props.location.state})
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
    const MediScanData = MediScan.networks[networkID]

    if(MediScanData) {
      const mediScan = new web3.eth.Contract(MediScan.abi, MediScanData.address)
      this.setState({ mediScan })
      

    } else {
      window.alert('MediScan contract not deployed to detected network.')
    }
    
  }

  async handleTakePhotoAnimationDone(dataUri) {
    this.setState({dataUri: dataUri})
  }

    

  constructor(props) {
    super(props)
    this.state = {
      newPatient: {},
      patientCreated:{},
      files: [],
      dataUri:''

    }
  }

 
    render(){
        return(
            <div>
                <Navbar account={this.state.account}/>
                <center>
                <div className="imageCard">
                {/* this.state.files.length == 0 ?<div className="actualCards">
                
                {/*(this.state.dataUri)
          ? null
          : <Camera isImageMirror={false} scale={0.5} onTakePhotoAnimationDone = {(eee)=>this.handleTakePhotoAnimationDone(eee)} 
          onTakePhoto = { (dataUri) => { this.handleTakePhotoAnimationDone(dataUri); } }
      
                />*}
                    </div>:null*/}
                    { this.state.files.length == 0 ?<div className="actualCards" >
                     <FileBase64
        multiple={ true }
        onDone={ this.getFiles.bind(this) } />
                        Upload
                    </div>:null}
                    <div className="text-center">
          { this.state.files.map((file,i) => {
            return <img key={i} src={file.base64} width={400} />
          }) }
          <img src="" />
        </div>

        { this.state.files.length != 0 ?
          <div>
            <h3 className="text-center mt-25">Callback Object</h3>
            <div className="pre-container">
              <pre>{ JSON.stringify(this.state.files[0]['name']+" "+this.state.files[0]['type']+" "+this.state.files[0]['size'], null, 2) }</pre>
            </div>
          </div>
        : null }
            {this.state.files.length==0?null :<Link to={{pathname: "/qrCode", state: JSON.stringify({"prevData":this.props.location.state,"base64":this.state.files[0]['base64']}/* , null, 2 */)}} onClick={(e)=>this.onFormSubmit(e)}><Button style={{color: 'white', borderRadius: 10, backgroundColor:'blue', height: 50, width: 100, justifyContent: 'center'}}>
              SUBMIT
            </Button></Link> }
                </div>
                </center>
            </div>
        );
    }

    // Callback~
  getFiles(files){
    this.setState({ files: files })
  }

  onFormSubmit(e) {
    e.preventDefault()
     this.handleSubmitFile();
  }
    // Image/File Submit Handler
    handleSubmitFile = async() => {

      if (this.state.files[0] !== null){

          let formData = new FormData();
          let config = {

            headers: {
              "Content-type": "multipart/form-data",
                "Access-Control-Allow-Origin" : "",
                "Allow": "POST",
        
            
            }
        };
          formData.append('image', this.state.files[0]['file']);
          // the image field name should be similar to your api endpoint field name
          // in my case here the field name is customFile
          axios.post(
              this.custom_file_upload_url,
              formData,
              config
          )
          .then(res => {
              this.props.history.push({
                pathname: '/qrCode',
                state: JSON.stringify({"prevData":this.props.location.state,"image":JSON.parse(JSON.stringify(res.data))['name']})
            });
          })
          .catch(err => {
              console.error(err);
          })
      }
  }
}

export default ChooseImage; 