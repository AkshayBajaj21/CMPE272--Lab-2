import React, { PropTypes,Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Cookies from 'js-cookie';
import {connect} from 'react-redux';
import {afterlogin} from "../../actions";
import {updateUser} from "../../actions";
//import './';

export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:"",
            password:"",
            count : 0
        }
        this.idChangeHandler = this.idChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    idChangeHandler = (e) => {
        this.setState({
            id : e.target.value
        });
    }
    
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    componentDidMount(){
        if(Cookies.get('id')){
            this.props.history.push("/course"); 
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        const data = {
            id: this.state.id,
            password: this.state.password
            
        }
        
        console.log("Data in frontend send from login to server is" +data.id);
        axios.post("http://ec2-13-57-189-225.us-west-1.compute.amazonaws.com:3001/login", data)
            .then(response => {
                console.log("Data in frontend after kafka",response.data.data )
                if(response.data.data.message==="success"){
                    console.log("token received is ",response.data.data)
                    Cookies.set('id',response.data.data.id);
                    Cookies.set('role',response.data.data.role);
                    console.log("props sent to action are "+ response.data.data.id)
                    console.log("props sent to action are "+ response.data.data.name)
                    console.log("props sent to action are "+ response.data.data.email)
                    console.log("props sent to action are "+ response.data.data.phonenumber)
                    console.log("props sent to action are "+ response.data.data.city)
                    console.log("props sent to action are "+ response.data.data.aboutme)
                    console.log("props sent to action are "+ response.data.data.country)
                    console.log("props sent to action are "+ response.data.data.company)
                    console.log("props sent to action are "+ response.data.data.school)
                    console.log("props sent to action are "+ response.data.data.gender)
                    console.log("props sent to action are "+ response.data.data.hometown)

                    this.props.afterlogin(response.data.data);
                    this.props.history.push("/course");
                }
                // else if(response.data.message==="error"){
                //     alert("No such user found.");
                //     this.props.history.push("/");
                // }
                else{
                    alert("Incorrect username or passowrd.");
                    this.props.history.push("/");
                }
            });
    }

    render() {
        return (
        <div className="login">
            <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7" alt="Logo" className="loginlogo" /><br/>
            <form onSubmit={this.submitHandler}>
                <input type="text" name="id" placeholder="SJSU ID" onChange={this.idChangeHandler} pattern="\d+" title="Enter a valid ID" required/><br/>
                <input type="password" name="password" placeholder="Password" onChange={this.passwordChangeHandler} required/><br/>
                <input type="submit" className="btn btn-primary" value="Sign In"/><br/><br/>
                Not a Member?  <Link to="/signup">Signup</Link>
            </form>
        </div>
        )
  } 
}
function mapDispatchToProps(dispatch) {
   console.log("mapDispatchToProps of login page")
    return {
        
        afterlogin : (data) => dispatch(afterlogin(data))
    };
}
export default (connect(null, mapDispatchToProps)(Login));
