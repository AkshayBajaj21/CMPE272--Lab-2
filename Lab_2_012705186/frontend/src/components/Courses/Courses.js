import React, { Component } from 'react'
import { Navbar } from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Cookies from 'js-cookie';
import Coursecard, { Cardtemplate } from '../CardTemplate/Cardtemplate';
import './Courses.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {getCourses} from "../../actions";
import Draggable, {DraggableCore} from 'react-draggable';

export class Courses extends Component {
  constructor(props){
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
        id: Cookies.get('id'),
        role: Cookies.get('role'),
        page : "nothing",
        courses:""
    }
    this.previousPageHandler = this.previousPageHandler.bind(this);
    this.nextPageHandler = this.nextPageHandler.bind(this);
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
    axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.page}`)
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
    axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.page}`)
    .then((response)=>{
      if(response.data.data.message==="success"){
        // alert("Action completed."); 
        window.location.reload();
      }
    });
  })
}

// previousPageHandler = (e) => {
//   // e.preventDefault();
//   this.setState({
//       page : "previous"
//   });
//   console.log("Line for pagination 45",this.state.page);
//   axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.page}`)
//   .then((response)=>{
//     if(response.data.message==="success"){
//       alert("Action completed.");
//       this.props.history.push("/course");
//     }
//   });
// }

  componentDidMount(){
   console.log("entered CDM of course is page is ",this.state.page);
    axios.get(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.page}`)
    .then((response) => {
      console.log("props sent to course action are ", response.data.data.courses)
      this.props.getCourses(response.data.data.courses);

      this.setState({
        courses : this.props.coursedata.courses})
    })

    
  }
  render() {
   // console.log("name of course is" +courses.coursename[0]);
    let cous = [];
    const isStudent = Cookies.get("role") === 'faculty';
    Object.assign(cous,this.state.courses)
   console.log("entered frontend course")
    console.log(this.state.courses)
    //let courses = [{"cid":"202","cname":"SSS"},{"cid":"202","cname":"SSS"},{"cid":"202","cname":"SSS"}]

    let images = "https://www.sanjac.edu/sites/default/files/blue-color.jpg";
    return (
      <div>
        <div><Navbar/></div>
        <div className="container courses">
            <h1 align="center">Courses</h1>
            <div className="studcourses">
            
            <div className="row mycourses"> 
              {cous.map((course,index)=>{
                return <Cardtemplate key = {index} id = {course.courseid} name = {course.coursename} term = {course.courseterm}    />
          })}
          </div>
              <hr/>
              </div>
              <div class="wrapper">
              {isStudent
              ?<Link to="course/new"><button className="btn btn-primary">Add Course</button></Link>:null}
               {/* <Link to="course/search"><button className="btn btn-primary">Search Course</button></Link>} */}
            <br/><br/>
            
          <button  class="button" className="btn btn-primary" onClick={this.previousPageHandler}>Previous Page</button>&nbsp;&nbsp;
          <button class="button" className="btn btn-primary" onClick={this.nextPageHandler}>Next Page</button>
            </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(data) {
  console.log("lINE 72" , data.coursereducer.courses)
  const coursedata = data.coursereducer;
      return {coursedata};
  }

function mapDispatchToProps(dispatch) {
  console.log("mapDispatchToProps of course page")
   return {
       
       getCourses : (data) => dispatch(getCourses(data))
   };
}
export default (connect(mapStateToProps, mapDispatchToProps)(Courses));
