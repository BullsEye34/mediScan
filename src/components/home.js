import React, { Component } from 'react'
class Home extends Component{
    render(){
        return(
            <div>
          <Navbar account={this.state.account} />
         <div className='cardsa'>
         <div className='actualCard'><Jumbotron fluid>
    <Container>
      <h1 style={{textAlign:'center', }}>Scan Code</h1>
      <p style={{textAlign:'center', }}>
        Press me to scan a new code
      </p>
    </Container>
  </Jumbotron></div>
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