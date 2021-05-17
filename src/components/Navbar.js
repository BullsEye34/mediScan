import React, { Component } from 'react'
import {Nav} from 'react-bootstrap'

class Navbar extends Component {

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
</Nav>
    );
  }
}

export default Navbar;
