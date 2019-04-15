import React, { Component } from 'react'
import { Navbar } from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {afterlogin} from "../../actions";
import {updateUser} from "../../actions";
import "./Profile.css";

export class Profile extends Component {
  constructor(){
    super();
    // this.state =
    // {
    //   profile : []
    // }
  }
  componentDidMount(){
    console.log("entered profile CDM");
     axios.get('http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/profile')
     .then((response) => {
       console.log(response.data.data);
      //  this.props.afterlogin(response.data);
       console.log('email id retreived from redux' , this.props.userdata)
      //  this.setState({      
      //   profile : response.data.profile[0]    
      //   });
       // console.log("result of profile im frontend is  " , this.state.profile.userid);
   });
  }
  render() {
    return (

      <div>
        <div><Navbar/></div>
        <div className="container profile">
          <h1 >My Profile</h1>
          <div className="row">
            <div className="col-3">
              <img src="https://cdn3.iconfinder.com/data/icons/fillies-small/64/id-card-512.png" alt="profilepic" className="profilepic" />
              <hr/>
            </div>
            <div className="col-7">
              <h4>Account Info</h4>
              <table>
                <tbody>
                  <tr>
                    <td>SJSU ID</td>
                    <td>: {this.props.userdata.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>: {this.props.userdata.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>: {this.props.userdata.email}</td>
                  </tr>
                </tbody>
              </table><br/>
              <h4>Personal Info</h4>
              <table>
                <tbody>
                  <tr>
                    <td>Contact</td>
                    <td>: {this.props.userdata.phonenumber}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>: {this.props.userdata.city}</td>
                  </tr>
                  <tr>
                    <td>About Me</td>
                    <td>: {this.props.userdata.aboutme}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>: {this.props.userdata.country}</td>
                  </tr>
                  <tr>
                    <td>Company</td>
                    <td>: {this.props.userdata.company}</td>
                  </tr>
                  <tr>
                    <td>School</td>
                    <td>: {this.props.userdata.school}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>: {this.props.userdata.gender}</td>
                  </tr>
                  <tr>
                    <td>Hometown</td>
                    <td>: {this.props.userdata.hometown}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div><div className="col-2">
              <Link to="/profile/edit"><button className="btn btn-primary">Edit Profile</button></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(data) {
  console.log("lINE 113" , data)
  const userdata = data.userreducer;
      return {userdata};
  }
  
  function mapDispatchToProps(dispatch) {
      return {
          // updateUser : (data) => dispatch(updateUser(data)),
          // afterlogin : (data) => dispatch(afterlogin(data))
      };
  }
  
  export default (connect(mapStateToProps, mapDispatchToProps)(Profile));


// export default Profile