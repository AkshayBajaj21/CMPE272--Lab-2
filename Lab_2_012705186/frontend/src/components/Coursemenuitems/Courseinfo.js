import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Courseinfo.css';
import Cookies from 'js-cookie';
import Coursemenu from '../Coursemenu/Coursemenu';

export class Courseinfo extends Component {

  constructor(props){
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/login");
    }
    this.state =
    { cid: this.props.match.params.id,
      information : [],
      // statinfo : ""
    }
    this.dropHandler = this.dropHandler.bind(this);
    this.enrollHandler = this.enrollHandler.bind(this);
    this.waitlistHandler = this.waitlistHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  dropHandler(){
    this.setState({
      action: "drop"
    });
  }
  enrollHandler(){
    this.setState({
      action: "enroll"
    });
  }
  waitlistHandler(){
    this.setState({
      action: "waitlist"
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const data = {action: this.state.action};
    console.log("Entered drop course handler " + data.action); 
    axios.post(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/information`,data)
    .then((response)=>{
     // if(response.data.message==="success"){
        alert("Action completed.");
       this.props.history.index = 0;
       window.location.reload();
     // }
    });
  }

  componentDidMount(){
    console.log("entered course info CDM " + this.props.match.params.id);

     axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/information`)
     .then((response) => {
       console.log("information returned in frontend : " , response.data);
       this.setState({      
        information : response.data.data.information[0],
        statinfo : response.data.data.status
        });
       console.log("result of profile im frontend is  " +this.state.information.cid);
   });
  }
  render() {
    const isStudent = Cookies.get("role") === "student";
    return (
      <div>
        <div><Navbar/></div>
        <div className="container">
          <h1>CMPE {this.state.cid} ENTERPRISE DISTRIBUTED SYSTEMS</h1>
        <div className="row">
          <div className="col-2">
            <Coursemenu cid={this.state.cid} />
          </div>
          <div className="col-10">
              <table className="courseinfo">
                <tbody>
                  <tr>
                    <td>Department</td>
                    <td>{this.state.information.department}</td>
                  </tr>
                  <tr>
                    <td>Faculty</td>
                    <td>{this.state.information.faculty}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{this.state.information.description}</td>
                  </tr>
                  <tr>
                    <td>Classroom</td>
                    <td>{this.state.information.classroom}</td>
                  </tr>
                  <tr>
                    <td>Term</td>
                    <td>{this.state.information.term}</td>
                  </tr>
                  <tr>
                    <td>Total Capacity</td>
                    <td>{this.state.information.totalcapacity}</td>
                  </tr>
                  <tr>
                    <td>Waitlist Capacity</td>
                    <td>{this.state.information.waitlist}</td>
                  </tr>
                  {(isStudent)?<tr><td>Status</td>
                       <td>{this.state.statinfo}</td></tr>                        
                      :<tr></tr>}
                  <tr>
                    <td></td>
                    <td>
                    {(isStudent)
                    ? (this.state.statinfo ==="none")?<span>
                      <form onSubmit={this.submitHandler}>
                      <input type="submit" name="enroll" value="Enroll" className="btn btn-danger dropcourse" onClick={this.enrollHandler} />&nbsp;
                      <input type="submit" name="waitlist" value="Waitlist" className="btn btn-danger dropcourse" onClick={this.waitlistHandler} />&nbsp;
                      </form>
                    </span>
                    :<span>
                      <form onSubmit={this.submitHandler}>
                      <input type="submit" name="drop" value="Drop" className="btn btn-danger dropcourse" onClick={this.dropHandler} />
                      </form>
                    </span>
                    : <span></span>} 
                    {/* <form onSubmit={this.submitHandler}><span>
                    {(Cookies.get('role')==='student')?<input type="submit" name="drop" value="Enroll Course"  className="btn btn-danger dropcourse" onClick={this.dropHandler} />:null}
                    {(Cookies.get('role')==='student')?<input type="submit" name="drop" value="Add to Waitlist"  className="btn btn-danger dropcourse" onClick={this.dropHandler} />:null}
                    
                    </form>
                    :<span>
                    <form onSubmit={this.submitHandler}>
                    {(Cookies.get('role')==='student')?<input type="submit" name="drop" value="Drop Course"  className="btn btn-danger dropcourse" onClick={this.dropHandler} />:null}
                    :</span>
                    </form>
                    </span> */}
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Courseinfo
