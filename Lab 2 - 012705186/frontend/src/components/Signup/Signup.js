import React, { Component } from 'react'
import axios from 'axios';
import '../Login/Login.css';

export class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:"",
            name:"",
            email:"",
            password:"",
            role:""
        }
        this.idChangeHandler = this.idChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.roleChangeHandler = this.roleChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    idChangeHandler = (e) => {
        this.setState({
            id: e.target.value
        });
    }
    
    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    
    roleChangeHandler = (e) => {
        this.setState({
            role: e.target.value
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        const data = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        }
        axios.post("http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/signup", data)
            .then(response => {
                console.log("entered signup frontebnd after kafka response ",response.data.data);
                if (response.data.data.message === "success") {
                    this.props.history.push("/login");
                    alert("User signed up successfully");
                }
                else {
                    this.props.history.push("/login");
                    alert("Please try again");
                }
            });
    }

  render() {
    return (
      <div className="container login">
        <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7" alt="Logo" className="loginlogo" />
        <form onSubmit={this.submitHandler}>
            <input type="text" placeholder="SJSU ID" onChange={this.idChangeHandler} pattern="\d+" title="Enter a valid ID" required /><br />
            <input type="text" placeholder="Name" onChange={this.nameChangeHandler} required /><br />
            <input type="email" placeholder="Email" onChange={this.emailChangeHandler} required /><br />
            <input type="password" placeholder="Password" onChange={this.passwordChangeHandler} required /><br/>
            <label>Student
            <input type="radio" name="role" value="student" onChange={this.roleChangeHandler} checked={this.state.role==="student"} required /></label>
            <label>Faculty
            <input type="radio" name="role" value="faculty" onChange={this.roleChangeHandler} checked={this.state.role==="faculty"} /></label>
            <input type="submit" className="btn btn-primary" value="Sign Up" />
        </form>
      </div>
    )
  }
}

export default Signup
