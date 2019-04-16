import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Coursemenu from '../Coursemenu/Coursemenu';

export class Assignment extends Component {
    constructor(props) {
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/login");
          }
        this.state = {
            cid: this.props.match.params.id,
            assignment: [],
            files: [],
            page : "nothing",
            content: ""
        }
        // this.touploadHandler = this.touploadHandler.bind(this);
        this.previousPageHandler = this.previousPageHandler.bind(this);
        this.nextPageHandler = this.nextPageHandler.bind(this);
        this.gradeHandler = this.gradeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.contentHandler = this.contentHandler.bind(this);
    }

    componentDidMount(){
      //  console.log("entered announcement edit CDM " + this.props.match.params.id);
          axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/assignment/${this.state.page}`)
          .then((response) => {
             console.log("peoples returned in assignment : " ,response.data);
             this.setState({      
                assignment : response.data.data.assignment
              });
             console.log("result of profile im frontend is  " +this.state.assignment.assignment);
         });
 
       }

       gradeHandler = (e) => {
        e.preventDefault();
         alert("Grade assigned to student successfully");  
         this.props.history.push(`/course/${this.state.cid}/info`);
    }
    contentHandler = (e) => {
      this.setState({
          content: e.target.value
      });
  }

    nextPageHandler = (e) => {
        // e.preventDefault();
       new Promise((resolve,reject) =>{
          this.setState({
            page : "next"
        })
         resolve (this.state.page) 
        })
        .then( (value) =>{
          console.log("Line for pagination 31",this.state.page);
          axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/assignment/${this.state.page}`)
          .then((response)=>{
            if(response.data.data.message==="success"){
              // alert("Action completed."); 
              window.location.reload();
            }
          });
        })
      }
      
      previousPageHandler = (e) => {
        // e.preventDefault();
       new Promise((resolve,reject) =>{
          this.setState({
            page : "previous"
        })
         resolve (this.state.page) 
        })
        .then( (value) =>{
          console.log("Line for pagination 31",this.state.page);
          axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/assignment/${this.state.page}`)
          .then((response)=>{
            if(response.data.data.message==="success"){
              // alert("Action completed."); 
              window.location.reload();
            }
          });
        })
      }
      submitHandler = (e) =>{
        e.preventDefault();
        const data = {content: this.state.content};
        console.log(data);              
        axios.post(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/assignment`,data)
        .then((response)=>{
          console.log("reponse for announcement edit is ",response.data)
          if(response.data.message==="success"){
            alert("Action completed.");
            this.props.history.index = 0;
            window.location.reload();
          }
        });
      }
    render() {
        const isFaculty = Cookies.get("role") === "faculty";
        let files = ['Assignment 1', 'Assignment 2', 'Assignment 3'];
        let assignment = [];
        Object.assign(assignment,this.state.assignment)
        return (
            <div>
                <div><Navbar /></div>
                <div className="container">
                    <h1>CMPE {this.state.cid} ENTERPRISE DISTRIBUTED SYSTEMS</h1>
                    <div className="row">
                        <div className="col-3"><Coursemenu cid = {this.state.cid}/></div>
                        <div className="col-9">
                            {assignment.map((assignment, index) => {
                                return <div key={index}><h5>{assignment.assignment}<hr /></h5>
                               {(Cookies.get('role')==="faculty")?<input type="text" placeholder="Student ID" ></input>:<span></span>}  &nbsp;&nbsp;
                               {(Cookies.get('role')==="faculty")?<input type="text" placeholder="Grade" ></input>:<span></span>} &nbsp;&nbsp;
                                {(Cookies.get('role')==="faculty")
                                ?<button className="btn btn-danger" onClick={this.gradeHandler}>GRADE</button>
                                :<span></span>
                                }
                            </div>
                            })}                     

                    
                    {/* {(Cookies.get('role')==="student")?<h5>Make new assignment</h5>:null} */}
                    {(Cookies.get('role')==="faculty")?<form onSubmit={this.submitHandler}>                            
                                <textarea rows="5" cols="50" placeholder="Create new Assignment" onChange={this.contentHandler}></textarea><br/>
                                <input type="submit" value="Submit" className="btn btn-primary"></input>
                            </form> :null}
                            </div></div>
                    <div class="wrapper">
                         <button  class="button" className="btn btn-primary" onClick={this.previousPageHandler}>Previous Page</button>&nbsp;&nbsp;
                         <button class="button" className="btn btn-primary" onClick={this.nextPageHandler}>Next Page</button>
                        </div>
                </div>
            </div>
        )
    }
}

export default Assignment
