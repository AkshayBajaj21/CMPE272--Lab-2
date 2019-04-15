import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Coursemenu from './Coursemenu';
import './Createquiz.css';

export class Quiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            qid:"",
            qname:"",
            q1:"",
            q2:"",
            q3:"",
            op11:"",
            op12:"",
            op13:"",
            op21:"",
            op22:"",
            op23:"",
            op31:"",
            op32:"",
            op33:"",
            answer1:"",
            answer2:"",
            answer3:"",
        }
        this.qidHandler = this.qidHandler.bind(this);
        this.qnameHandler = this.qnameHandler.bind(this);
        this.q1Handler = this.q1Handler.bind(this);
        this.q2Handler = this.q2Handler.bind(this);
        this.q3Handler = this.q3Handler.bind(this);
        this.op11Handler = this.op11Handler.bind(this);
        this.op12Handler = this.op12Handler.bind(this);
        this.op13Handler = this.op13Handler.bind(this);
        this.op21Handler = this.op21Handler.bind(this);
        this.op22Handler = this.op22Handler.bind(this);
        this.op23Handler = this.op23Handler.bind(this);
        this.op31Handler = this.op31Handler.bind(this);
        this.op32Handler = this.op32Handler.bind(this);
        this.op33Handler = this.op33Handler.bind(this);
        this.answer1Handler = this.answer1Handler.bind(this);
        this.answer2Handler = this.answer2Handler.bind(this);
        this.answer3Handler = this.answer3Handler.bind(this);
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
    q3Handler = (e) => {
        this.setState({
            q3: e.target.value
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
    op13Handler = (e) => {
        this.setState({
            op13:e.target.value
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
    op23Handler = (e) => {
        this.setState({
            op23:e.target.value
        });
    }
    op31Handler = (e) => {
        this.setState({
            op31:e.target.value
        });
    }
    op32Handler = (e) => {
        this.setState({
            op32:e.target.value
        });
    }
    op33Handler = (e) => {
        this.setState({
            op33:e.target.value
        });
    }
    answer1Handler = (e) => {
        this.setState({
            answer1:e.target.value
        });
    }
    answer2Handler = (e) => {
        this.setState({
            answer2:e.target.value
        });
    }
    answer3Handler = (e) => {
        this.setState({
            answer3:e.target.value
        });
    }
    submitHandler = (e)=>{
        e.preventDefault();
        alert("Quiz submitted successfully !!");
         this.props.history.push(`/course/${this.state.cid}/info`);
    }

  render() {
    return (
      <div>
        <div><Navbar /></div>
            <div className="container">
                <h1>CMPE 273 ENTERPRISE DISTRIBUTED SYSTEMS</h1>
                <div className="row">
                    <div className="col-3"><Coursemenu /></div>
                    <div className="col-9">
                        <form className="quizform" onSubmit={this.submitHandler}>
                            <input type="text" name="qid" placeholder="Quiz ID" onChange={this.qidHandler} />&nbsp;
                            <input type="text" name="qname" placeholder="Quiz Name" onChange={this.qnameHandler} /><br/><hr/>
                            <h4>Enter questions, options and select correct answer</h4>
                            <input type="text" name="q1" placeholder="Question 1" className="quizquestion" onChange={this.q1Handler} /><br/>
                            <div className="option"><input type="radio" name="anwser1" value="op11" required onChange={this.op11Handler} /><input type="text" name="op11" placeholder="Option 1" /></div>
                            <div className="option"><input type="radio" name="anwser1" value="op12" onChange={this.op12Handler} /><input type="text" name="op11" placeholder="Option 2" /></div>
                            <div className="option"><input type="radio" name="anwser1" value="op13" onChange={this.op13Handler} /><input type="text" name="op11" placeholder="Option 3" /><br/></div>
                            <input type="text" name="q2" placeholder="Question 2" className="quizquestion" /><br/>
                            <div className="option"><input type="radio" name="anwser2" value="op21" required onChange={this.op21Handler} /><input type="text" name="op11" placeholder="Option 1" /></div>
                            <div className="option"><input type="radio" name="anwser2" value="op22" onChange={this.op22Handler} /><input type="text" name="op12" placeholder="Option 2" /></div>
                            <div className="option"><input type="radio" name="anwser2" value="op23" onChange={this.op23Handler} /><input type="text" name="op13" placeholder="Option 3" /><br/></div>
                            <input type="text" name="q3" placeholder="Question 3" className="quizquestion" /><br/>
                            <div className="option"><input type="radio" name="anwser3" value="op31" required onChange={this.op31Handler} /><input type="text" name="op11" placeholder="Option 1" /></div>
                            <div className="option"><input type="radio" name="anwser3" value="op32" onChange={this.op32Handler}  /><input type="text" name="op12" placeholder="Option 2" /></div>
                            <div className="option"><input type="radio" name="anwser3" value="op33" onChange={this.op33Handler}  /><input type="text" name="op13" placeholder="Option 3" /><br/><hr/></div>
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
