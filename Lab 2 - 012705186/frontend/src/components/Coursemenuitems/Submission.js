import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Coursemenu from '../Coursemenu/Coursemenu';

export class Submission extends Component {
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
    }

    componentDidMount(){
      //  console.log("entered announcement edit CDM " + this.props.match.params.id);
          axios.get(`http://ec2-13-57-189-225.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/assignment/${this.state.page}`)
          .then((response) => {
             console.log("peoples returned in frontend : " + response.data.data.assignment);
             this.setState({      
                assignment : response.data.data.assignment
              });
             console.log("result of profile im frontend is  " +this.state.assignment.assignment);
         });
 
       }

    touploadHandler = (e) => {

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
          axios.get(`http://ec2-13-57-189-225.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/assignment/${this.state.page}`)
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
          axios.get(`http://ec2-13-57-189-225.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/assignment/${this.state.page}`)
          .then((response)=>{
            if(response.data.data.message==="success"){
              // alert("Action completed."); 
              window.location.reload();
            }
          });
        })
      }
    render() {
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
                                return <div key={index}><h5>{assignment.assignment}<hr /></h5></div>
                            })}
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

export default Submission
