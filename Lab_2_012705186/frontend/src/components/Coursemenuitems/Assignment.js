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
            toupload: ""
        }
        this.touploadHandler = this.touploadHandler.bind(this);
        this.previousPageHandler = this.previousPageHandler.bind(this);
        this.nextPageHandler = this.nextPageHandler.bind(this);
        this.gradeHandler = this.gradeHandler.bind(this);
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
                                 <input type="text" placeholder="Student ID" ></input>  &nbsp;&nbsp;
                                 <input type="text" placeholder="Grade" ></input> &nbsp;&nbsp;
                                {(Cookies.get('role')==="student")
                                ?<button className="btn btn-danger" onClick={this.gradeHandler}>GRADE</button>
                                :<span></span>
                                }
                            </div>
                            })}
                            {(isFaculty)?
                            <form>
                                <h3>Upload Assignment:   </h3><input type="file" name="lecturenote" onChange={this.touploadHandler} />
                                <input type="submit" value="Upload" />
                            </form>:null}
                        </div>

                    </div>
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
