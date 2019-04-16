import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import './Coursesearch.css';

export class Coursesearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchterm: ""
        }
        this.serachtermHandler = this.serachtermHandler.bind(this);
    }

    serachtermHandler = (e) => {
        this.setState({
            searchterm: e.target.value
        });
    }

  render() {
      let courses = [{ "cid": "202", "cname": "Software Engg" }, { "cid": "212", "cname": "Computer Engg" }, { "cid": "202", "cname": "Applied Computer Science" }, { "cid": "202", "cname": "Archaelogical Department of History " }]

    let images = "https://www.sanjac.edu/sites/default/files/blue-color.jpg";

    return (
      <div>
        <div><Navbar/></div>
        <div className="container">
            <h1>Search Courses</h1>
            <div className="searchinput">
            <input type="text" name="searchterm" placeholder="Search course by id or name" onChange={this.serachtermHandler}/><br/><hr/>
            <div className="courseresult">
                {courses.map((course,index)=>{
                    return (course.cname.toLowerCase().includes(this.state.searchterm.toLowerCase())) || (course.cid.toLowerCase().includes(this.state.searchterm.toLowerCase()))?
                        <Link to=""><Card key={index} className="cards searchcards">
                            <img src={images} alt="card" className="cardcolor" />
                            <h5>{course.cid}</h5>{course.cname}
                            <br/><span className="term">Term</span>
                        </Card></Link>
                    :<span key={index}></span>
                })}
            </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Coursesearch
