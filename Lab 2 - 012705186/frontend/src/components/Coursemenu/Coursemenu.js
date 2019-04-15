import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Coursemenu.css';
import axios from 'axios';
import Cookies from 'js-cookie';

export class Coursemenu extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/login");
    }
    this.state = {
        cid: this.props.cid,
    }}
  render() {
    console.log("the course menu is : " +this.props.cid);  
    return (
      <div className="coursemenu">
        <ul className="menuul">
            <Link to={`/course/${this.props.cid}/info`}><li className="list-group-item list-group-item-dark">Information</li></Link>
            <Link to={`/course/${this.props.cid}/people`}><li className="list-group-item list-group-item-light">People</li></Link>
            <Link to={`/course/${this.props.cid}/announcement`}><li className="list-group-item list-group-item-light">Announcements</li></Link>
            <Link to={`/course/${this.props.cid}/assignment`}><li className="list-group-item list-group-item-dark">Assignments</li></Link>
            <Link to={`/course/${this.props.cid}/file`}><li className="list-group-item list-group-item-dark">Files</li></Link>
            <Link to={`/course/${this.props.cid}/submission`}><li className="list-group-item list-group-item-light">Submissions</li></Link>
            <Link to={`/course/${this.props.cid}/quiz`}><li className="list-group-item list-group-item-dark">Quizzes</li></Link>
        </ul>
      </div>
    )
  }
}

export default Coursemenu
