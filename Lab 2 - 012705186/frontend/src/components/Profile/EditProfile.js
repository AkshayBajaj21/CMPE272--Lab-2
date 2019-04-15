import React, { Component } from 'react';
import { Navbar } from '../Navbar/Navbar';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from "../../actions";
import './Profile.css';

export class EditProfile extends Component {
    constructor(props){
        super(props);
       
        this.state={
            id:"",
            name:"",
            email:"",
            city:"",
            cno:"",            
            about:"",
            hometown:"",
            country:"",
            company:"",
            school:"",
            gender:"",            
            profile : []
        }
        this.idHandler = this.idHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
       // this.passwordHandler = this.passwordHandler.bind(this);
        this.cnoHandler = this.cnoHandler.bind(this);
        this.cityHandler = this.cityHandler.bind(this);
        this.hometownHandler = this.hometownHandler.bind(this);
        this.countryHandler = this.countryHandler.bind(this);
        this.companyHandler = this.companyHandler.bind(this);
        this.schoolHandler = this.schoolHandler.bind(this);
        this.genderHandler = this.genderHandler.bind(this);
        this.aboutHandler = this.aboutHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount(){
        console.log("entered profile edit CDM");
        //  axios.get('http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/profile')
        //  .then((response) => {
        //    console.log(response.data);
        //    console.log('email id retreived from redux' , this.props.userdata.email)
        //    this.setState({      
        //     profile : response.data.profile[0]    
        //     });
        //     console.log("result of profile im frontend is  " +this.state.profile.userid);
            this.setState({
                id : this.props.userdata.id,
                name : this.props.userdata.name,
                email : this.props.userdata.email,
                cno : this.props.userdata.phonenumber,
                city : this.props.userdata.city,
                hometown : this.props.userdata.hometown,
                country : this.props.userdata.country,
                company : this.props.userdata.company,
                school : this.props.userdata.school,
                gender : this.props.userdata.gender,
                about : this.props.userdata.aboutme,
                language : this.props.userdata.language,
                role : this.props.userdata.role            
            })
    //    });

      }
    idHandler = (e) => {
        this.setState({
            id:e.target.value
        });
    }
    nameHandler = (e) => {
        this.setState({
            name:e.target.value
        });
    }
    emailHandler = (e) => {
        this.setState({
            email:e.target.value
        });
    }
    cnoHandler = (e) => {
        this.setState({
            cno:e.target.value
        });
    }
    cityHandler = (e) => {
        this.setState({
            city:e.target.value
        });
    }
    hometownHandler = (e) => {
        this.setState({
            hometown:e.target.value
        });
    }
    countryHandler = (e) => {
        this.setState({
            country:e.target.value
        });
    }
    schoolHandler = (e) => {
        this.setState({
            school:e.target.value
        });
    }
    companyHandler = (e) => {
        this.setState({
            company:e.target.value
        });
    }
    genderHandler = (e) => {
        this.setState({
            gender:e.target.value
        });
    }
    aboutHandler = (e) => {
        this.setState({
            about:e.target.value
        });
    }

    submitHandler = (e) =>{
        e.preventDefault();
        console.log("entered submit handler of edir profile frontend",this.state.cno);
        const data = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            hometown: this.state.hometown,            
            city: this.state.city,
            country: this.state.country,
            school: this.state.school,
            company: this.state.company,
            gender: this.state.gender,
            cno: this.state.cno,
            about: this.state.about,
            language: this.state.language,
            role: this.state.role
        }
        console.log('Data sent to server profile edit' ,data)       
         axios.post("http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/profile/edit", data)
            .then(response => {
                console.log("entered edit profile frontebnd",response.data);
                if (response.data.data.message === "success") {
                    alert("User edited profile successfully");
                    this.props.updateUser(data); 
                    this.props.history.push("/profile");
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
        <div className=" container profile">
        <h1 >My Profile</h1>
                <form onSubmit={this.submitHandler}>
                <div className="row">
                <div className="col-3">
                <img src="https://cdn3.iconfinder.com/data/icons/fillies-small/64/id-card-512.png" alt="profilepic" className="profilepic" /><br/><br/>
                <input type="file" name="fileToUpload" id="fileToUpload" /><hr/>
                </div>
                <div className="col-9">
                    <table>
                        <tbody>
                        <tr>
                            <td>SJSU ID</td>
                            <td>: <input type="text" placeholder="id" value={this.props.userdata.id} pattern="\d+" title="Enter a valid ID" onChange={this.idHandler} readOnly/></td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>: <input type="text" name="name" placeholder={this.props.userdata.name}  onChange={this.nameHandler}  /></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>: <input type="email" name="email" placeholder={this.props.userdata.email}  onChange={this.emailHandler}  /></td>
                        </tr>

                        <tr>
                            <td>Contact</td>
                            <td>: <input type="text" name="cno" placeholder={this.props.userdata.phonenumber}   onChange={this.cnoHandler} pattern="\d{10}" title="Enter a valid contact number" /></td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>: <input type="text" name="city" placeholder={this.props.userdata.city}   onChange={this.cityHandler} /></td>
                        </tr>
                        <tr>
                            <td>Hometown</td>
                            <td>: <input type="text" name="hometown" placeholder={this.props.userdata.hometown}   onChange={this.hometownHandler} /></td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>: <input type="text" name="country" placeholder={this.props.userdata.country}  onChange={this.countryHandler}  /></td>
                        </tr>
                        <tr>
                            <td>Company</td>
                            <td>: <input type="text" name="company" placeholder={this.props.userdata.company}  onChange={this.companyHandler}  /></td>
                        </tr>
                        <tr>
                            <td>School</td>
                            <td>: <input type="text" name="school" placeholder={this.props.userdata.school} onChange={this.schoolHandler}  /></td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>: <label>
                            <input type="radio" name="gender" value="male" onChange={this.genderHandler} checked={this.props.userdata.gender ==="male"} />
                            Male&nbsp;</label>
                            <label>
                            <input type="radio" name="gender" value="female" onChange={this.genderHandler} checked={this.props.userdata.gender==="female"} />
                            Female&nbsp;</label>
                            <label>
                            <input type="radio" name="gender" value="other" onChange={this.genderHandler} checked={this.props.userdata.gender==="other"} />
                            Other&nbsp;</label>
                            </td>
                        </tr>
                        <tr>
                            <td>About</td>
                            <td><textarea name="about" placeholder={this.props.userdata.aboutme} rows="4" cols="40" onChange={this.aboutHandler} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" value="Update" className="btn btn-primary" /></td>
                        </tr>     
                        </tbody>
                    </table>
                </div>
                </div>
            </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(data) {
    console.log("lINE 246" , data)
    const userdata = data.userreducer;
        return {userdata};
    }
    
    function mapDispatchToProps(dispatch) {
        return {
             updateUser : (data) => dispatch(updateUser(data)),
            // afterlogin : (data) => dispatch(afterlogin(data))
        };
    }
    
    export default (connect(mapStateToProps, mapDispatchToProps)(EditProfile));
    
// export default EditProfile
