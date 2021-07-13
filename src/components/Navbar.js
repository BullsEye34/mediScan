import React, { Component } from 'react'
import {Nav} from 'react-bootstrap'
import io from 'socket.io-client';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const socket = io('http://127.0.0.1:3050', {
  transports: ['websocket', 'polling']
});
class Navbar extends Component {
  
  componentDidMount() {
    socket.on('cpu', cpuPercent => {
      //setData(currentData => [...currentData, cpuPercent]);
      var joined = this.state.data.concat(cpuPercent);
      this.setState({
        data: joined
      });
      //this.setState({data: cpuPercent['value']});
    });
  }
  constructor(props) {
    super(props)
    this.state = {
     data:[]

    }
  }
  render() {
    return (
      <Nav
  activeKey="/home"
  /* onSelect={(selectedKey) => alert(`selected ${selectedKey}`)} */
>
  <Nav.Item>
    <Nav.Link href="/">MediScan</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="disabled" disabled>
    {/* <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
            </small>
          </li>
        </ul> */}
        
        <small id="account">{this.props.account}</small>
    </Nav.Link>
  </Nav.Item>

  <Nav.Item>
    <Nav.Link eventKey="disabled" disabled>
    <LineChart width={500} height={100} data={this.state.data}> {/**width={500} height={300} */}
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </Nav.Link>
  </Nav.Item>
</Nav>
    );
  }
}

export default Navbar;
