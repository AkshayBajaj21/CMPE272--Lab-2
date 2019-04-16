import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Coursemenu from '../Coursemenu/Coursemenu';
import Cookies from 'js-cookie';
import Person from './Person';
import './People.css';

export class People extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/login");
    }
    this.state = {
      cid: this.props.match.params.id,
      page : "nothing",
      people:""
    }
    this.previousPageHandler = this.previousPageHandler.bind(this);
    this.nextPageHandler = this.nextPageHandler.bind(this);
  }
    componentDidMount(){
      console.log("entered people line 26 CDM");
       axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/people/${this.state.page}`)
       .then((response) => {
        //  console.log("peoples returned in frontend : " + response.data.data.people);
        if(response.data.data.people){
        this.setState({      
          people : response.data.data.people
          });
        }
        //  console.log("result of profile im frontend is  " +this.state.people.studentname);
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
        axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/people/${this.state.page}`)
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
        axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/people/${this.state.page}`)
        .then((response)=>{
          if(response.data.data.message==="success"){
            // alert("Action completed."); 
            window.location.reload();
          }
        });
      })
    }
  render() {
    let people = [];
    Object.assign(people,this.state.people)
    return (
      <div>
          <div><Navbar/></div>
          <div className="container">
          <h1>CMPE {this.state.cid} ENTERPRISE DISTRIBUTED SYSTEMS</h1>
              <div className="row">
                <div className="col-3"><Coursemenu cid={this.state.cid}/></div>
                <div className="col-9">
                    {people.map((ppl,index)=>{
                      return <Person key={index} name={ppl.studentname} cid={this.state.cid} id = {ppl.studentid}/>
            //          return <div key={index}>{ppl.studentname}<button className="removestudent">Remove Student</button><hr /> </div>
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

export default People
