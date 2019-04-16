import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Coursemenu from '../Coursemenu/Coursemenu';

export class Message extends Component {
    constructor(props) {
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/login");
          }
        this.state = {
            messages: [],
            receiver : "",
            page : "nothing",
            content : "",
            count : 1
        }
        this.titleHandler = this.titleHandler.bind(this);
        this.contentHandler = this.contentHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.previousPageHandler = this.previousPageHandler.bind(this);
        this.nextPageHandler = this.nextPageHandler.bind(this);
    }
    componentDidMount(){
       console.log("entered message edit CDM ");
         axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/message/${this.state.page}`)
         .then((response) => {
            console.log("messages returned in frontend : ",response.data.data.messages);
            this.setState({      
                messages : response.data.data.messages
             });
          //  console.log("result of profile im frontend is  " this.state.message.sender);
        });
      }
      titleHandler = (e) => {
        this.setState({
            receiver: e.target.value
        });
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
        console.log("Line for announcement pagination 31",this.state.page);
        axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/message/${this.state.page}`)
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
        axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/message/${this.state.page}`)
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
      const data = {receiver: this.state.receiver,
                    content: this.state.content};
      console.log(data);              
      axios.post('http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/message',data)
      .then((response)=>{
        if(response.data.data.message==="success"){
          alert("Message sent successfully");
          this.props.history.index = 0;
          window.location.reload();
        }
      });
    }
    render() {
        return (
            <div>
                <div><Navbar /></div>
                <div className="container">
                    <h1>Message Inbox</h1><br/>
                    <div className="row">
                         <div className="col-9">
                            {this.state.messages.map((messages, index) => {
                                return <div key={index}>
                                    <h5><b>Message Received<br/> </b>From : {messages.sender}</h5><h6>Date : {messages.time}</h6><p>Content - {messages.content}</p><br/>
                                </div>
                            })} <hr/></div></div>
                                                <div class="wrapper">
                         <button  class="button" className="btn btn-primary" onClick={this.previousPageHandler}>Previous Page</button>&nbsp;&nbsp;
                         <button class="button" className="btn btn-primary" onClick={this.nextPageHandler}>Next Page</button>
                    </div><br/>
                            <h5>Send Message</h5>                          
                            <form onSubmit={this.submitHandler}>
                                <input type="text" placeholder="Send message to" onChange={this.titleHandler} required></input><br/>
                                <textarea rows="5" cols="50" placeholder="Content" onChange={this.contentHandler} required></textarea><br/>
                                <input type="submit" value="Send" className="btn btn-primary"></input>
                            </form>
                
                </div>
            </div>
        )
    }
}

export default Message
