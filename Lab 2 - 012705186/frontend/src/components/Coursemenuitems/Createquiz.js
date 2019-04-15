import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import Coursemenu from '../Coursemenu/Coursemenu';
import Cookies from 'js-cookie';
import './Createquiz.css';

export class Quiz extends Component {
    constructor(props){
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/login");
          }
      
        this.state = {
            cid: this.props.match.params.id,
            qid:"",
            qname:"",
            q1:"",
            q2:"",
            op11:"",
            op12:"",
            op21:"",
            op22:""
        }
        this.qidHandler = this.qidHandler.bind(this);
        this.qnameHandler = this.qnameHandler.bind(this);
        this.q1Handler = this.q1Handler.bind(this);
        this.q2Handler = this.q2Handler.bind(this);
        this.op11Handler = this.op11Handler.bind(this);
        this.op12Handler = this.op12Handler.bind(this);
        this.op21Handler = this.op21Handler.bind(this);
        this.op22Handler = this.op22Handler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

    }

    qidHandler = (e) => {
        this.setState({
            qid:e.target.value
        });
    }
    qnameHandler = (e) => {
        this.setState({
            qname:e.target.value
        });
    }
    q1Handler = (e) => {
        this.setState({
            q1: e.target.value
        });
    }
    q2Handler = (e) => {
        this.setState({
            q2: e.target.value
        });
    }
    op11Handler = (e) => {
        this.setState({
            op11:e.target.value
        });
    }
    op12Handler = (e) => {
        this.setState({
            op12:e.target.value
        });
    }

    op21Handler = (e) => {
        this.setState({
            op21:e.target.value
        });
    }
    op22Handler = (e) => {
        this.setState({
            op22:e.target.value
        });
    }
 
    submitHandler = (e)=>{
        e.preventDefault();
        const data = {quizid: this.state.qid,
                      quizname: this.state.qname,
                      q1: this.state.q1,
                      q2: this.state.q2,
                      op11: this.state.op11,
                      op12: this.state.op12,
                      op21: this.state.op21,
                      op22: this.state.op22,
                    };
        console.log("Data sent to backend for quiz creation :",data);              
        axios.post(`http://ec2-13-57-189-225.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/quiz`,data)
        .then((response)=>{
          console.log("reponse for announcement edit is ",response.data)
          if(response.data.data.message==="success"){
            alert("Quiz created successfully");
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
                <h1>CMPE 273 ENTERPRISE DISTRIBUTED SYSTEMS</h1>
                <div className="row">
                    <div className="col-3"><Coursemenu cid = {this.state.cid}/></div>
                    <div className="col-9">
                        <form className="quizform" onSubmit={this.submitHandler} >
                            <input type="text" name="qid" placeholder="Quiz ID" onChange={this.qidHandler} />&nbsp;
                            <input type="text" name="qname" placeholder="Quiz Name" onChange={this.qnameHandler} /><br/><hr/>
                            <h4>Enter questions, options and select correct answer</h4>
                            <input type="text" name="q1" placeholder="Question 1" className="quizquestion" onChange={this.q1Handler} /><br/>
                            <input type="text" name="q1" placeholder="Option 11" className="quizquestion" onChange={this.op11Handler} /><br/>
                            <input type="text" name="q1" placeholder="Option 12" className="quizquestion" onChange={this.op12Handler} /><br/>
                            <input type="text" name="q1" placeholder="Answer 1" className="quizquestion"  /><br/>
                            <input type="text" name="q2" placeholder="Question 2" className="quizquestion" onChange={this.q2Handler} /><br/>
                            <input type="text" name="q1" placeholder="Option 21" className="quizquestion" onChange={this.op21Handler} /><br/>
                            <input type="text" name="q1" placeholder="Option 22" className="quizquestion" onChange={this.op22Handler} /><br/>
                            <input type="text" name="q1" placeholder="Answer 2" className="quizquestion"  /><br/>
{/*                 
                            <div className="option"><input type="text" name="anwser1" value="op11"  onChange={this.op11Handler} /><input type="text" name="op11" placeholder="Option 1" /></div>
                            <div className="option"><input type="text" name="anwser2" value="op12" onChange={this.op12Handler} /><input type="text" name="op12" placeholder="Option 2" /></div> */}
                            {/* <div className="option"><input type="radio" name="anwser1" value="op13" onChange={this.op13Handler} /><input type="text" name="op11" placeholder="Option 3" /><br/></div> */}
                            {/* <input type="text" name="q2" placeholder="Question 2" className="quizquestion" onChange={this.q2Handler} /><br/>
                            <div className="option"><input type="text" name="anwser3" value="op21"  onChange={this.op21Handler} /><input type="text" name="op21" placeholder="Option 1" /></div>
                            <div className="option"><input type="text" name="anwser4" value="op22" onChange={this.op22Handler} /><input type="text" name="op22" placeholder="Option 2" /></div> */}
                            {/* <div className="option"><input type="radio" name="anwser2" value="op23" onChange={this.op23Handler} /><input type="text" name="op13" placeholder="Option 3" /><br/></div> */}
                            {/* <input type="text" name="q3" placeholder="Question 3" className="quizquestion" /><br/>
                            <div className="option"><input type="radio" name="anwser3" value="op31" required onChange={this.op31Handler} /><input type="text" name="op11" placeholder="Option 1" /></div>
                            <div className="option"><input type="radio" name="anwser3" value="op32" onChange={this.op32Handler}  /><input type="text" name="op12" placeholder="Option 2" /></div>
                            <div className="option"><input type="radio" name="anwser3" value="op33" onChange={this.op33Handler}  /><input type="text" name="op13" placeholder="Option 3" /><br/><hr/></div> */}
                            <br/><br/>
                            <input type="submit" value="Post Quiz" />
                        </form>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}

export default Quiz
