import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Cookies from 'js-cookie';

export class Navbar extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
}

logout(){
    Cookies.remove('id');
    Cookies.remove('role');
}

  render() {
    return (
      <div className="navbar">
        <header id="navigation-bar">
            <ul className="navul">
                <div>
                <img src="http://www.sjsu.edu/communications/pics/identity/043014_Monogram_WEB_02.png" alt="logo" />
                </div><br/>
                <li><Link to="/profile"><i className="fas fa-4x fa-user"/><br/>Account</Link></li><br/>
                <li><Link to="/course"><i className="fas fa-4x fa-book" /><br/>Courses</Link></li><br/>
                <li><Link to="/message"><i className="fas fa-4x fa-inbox" /><br/>Messages</Link></li><br/>
                <li><Link to="/login" onClick={this.logout} ><i className="fas fa-4x fa-sign-in-alt" /><br/>Log Out</Link></li>
            </ul>            
        </header>
      </div>
    )
  }
}

export default Navbar
