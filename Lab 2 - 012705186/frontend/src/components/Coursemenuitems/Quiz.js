import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Coursemenu from '../Coursemenu/Coursemenu';

export class Quiz extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/login");
    }
    this.state = {
        cid: this.props.match.params.id,
        quiz: []
    }
}
  render() {
     console.log("entered from quiz render "+ this.state.cid);
      let quizzes = ['Click Here to open the quiz if you are ready']
    return (
      <div>
            <div><Navbar /></div>
            <div className="container">
                <h1>CMPE {this.state.cid} ENTERPRISE DISTRIBUTED SYSTEMS</h1>
                <div className="row">
                    <div className="col-3"><Coursemenu cid= {this.state.cid}/></div>
                    <div className="col-9">
                        {quizzes.map((quiz,index)=>{
                            return <Link to={`/course/quiz/${this.props.match.params.id}/info`} key={index}><h5>{quiz}</h5><hr/></Link>
                        })}
                         {(Cookies.get('role')==='faculty')?<Link to={`/course/quiz/${this.props.match.params.id}/new`}><button>Create Quiz</button></Link>:null}
                    </div>
                </div>
            </div>
      </div>
    )
  }
}

export default Quiz
