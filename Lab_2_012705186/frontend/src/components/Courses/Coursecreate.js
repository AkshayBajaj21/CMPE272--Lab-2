import React, { Component } from 'react'
import { Navbar } from '../Navbar/Navbar';
import './Coursecreate.css';
import Cookies from 'js-cookie';
import axios from 'axios';

export class Coursecreate extends Component {
    constructor(props){
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/login");
          }
        this.state = {
            cid:"",
            facultyid : "",
            cname:"",
            cdept:"",
            cdes:"",
            croom:"",
            ccap:"",
            waitcap:"",
            cterm:""
        }
        this.cidHandler = this.cidHandler.bind(this);
        this.cnameHandler = this.cnameHandler.bind(this);
        this.cdeptHandler = this.cdeptHandler.bind(this);
        this.cdesHandler = this.cdesHandler.bind(this);
        this.croomHandler = this.croomHandler.bind(this);
        this.ccapHandler = this.ccapHandler.bind(this);
        this.waitcapHandler = this.waitcapHandler.bind(this);
        this.ctermHandler = this.ctermHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    cidHandler = (e) =>{
        this.setState({
            cid:e.target.value
        });
    }
    cnameHandler = (e) =>{
        this.setState({
            cname:e.target.value
        });
    }
    cdeptHandler = (e) =>{
        this.setState({
            cdept:e.target.value
        });
    }
    cdesHandler = (e) =>{
        this.setState({
            cdes:e.target.value
        });
    }
    croomHandler = (e) =>{
        this.setState({
            croom:e.target.value
        });
    }
    ccapHandler = (e) =>{
        this.setState({
            ccap:e.target.value
        });
    }
    waitcapHandler = (e) =>{
        this.setState({
            waitcap:e.target.value
        });
    }
    ctermHandler = (e) =>{
        this.setState({
            cterm:e.target.value
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        const data = {

            cid: this.state.cid,
            cname: this.state.cname,
            cdes: this.state.cdes,
            cdept: this.state.cdept,
            croom: this.state.croom,
            ccap: this.state.ccap,
            waitcap: this.state.waitcap,
            cterm: this.state.cterm
            
    }
    axios.post("http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/new", data)
    .then(response => {
        console.log("entered cousre add frontebnd");
        if (response.data.data.message === "success") {
            this.props.history.push("/course");
            alert("User added course successfully");
        }
        else {
            this.props.history.push("/login");
            alert("Please try again");
        }
    });
}

  render() {
    return (
      <div>
        <div><Navbar/></div>
        <div className="container addcourse">
        <h1>Create Course</h1>
        <form onSubmit={this.submitHandler}>
            <table className="tablecourse">
                <tbody>
                    <tr>
                        <td>Course ID</td>
                        <td>: <input type="text" name="cid" onChange={this.cidHandler} required/></td>
                    </tr>
                    <tr>
                        <td>Course Name</td>
                        <td>: <input type="text" name="cname" onChange={this.cnameHandler} required/></td>
                    </tr>
                    <tr>
                        <td>Course Department</td>
                        <td>: <input type="text" name="cdept" onChange={this.cdeptHandler} required/></td>
                    </tr>
                    <tr>
                        <td>Course Description</td>
                        <td>: <input type="text" name="cdes" onChange={this.cdesHandler} required/></td>
                    </tr>
                    <tr>
                        <td>Course Room</td>
                        <td>: <input type="text" name="croom" onChange={this.croomHandler} required/></td>
                    </tr>
                    <tr>
                        <td>Course Capacity</td>
                        <td>: <input type="text" name="ccap" onChange={this.ccapHandler} required/></td>
                    </tr>
                    <tr>
                        <td>Waitlist Capacity</td>
                        <td>: <input type="text" name="waitcap" onChange={this.waitcapHandler} required/></td>
                    </tr>
                    <tr>
                        <td>Course Term</td>
                        <td>: <input type="text" name="cterm" onChange={this.ctermHandler} required/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="submit" className="btn btn-primary" value="Add Course" /></td>
                    </tr>
                </tbody>
            </table>
            </form>
        </div>
      </div>
    )
  }
}

export default Coursecreate
