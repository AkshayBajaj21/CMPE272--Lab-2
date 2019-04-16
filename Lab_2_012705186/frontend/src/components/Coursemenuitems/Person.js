import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Person.css';

export class Person extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:"",
            cid: "",
            action:""
        }
        this.removeClick = this.removeClick.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    removeClick = (e)=>{
        this.setState({
            id: this.props.id,
            cid: this.props.cid,
            action: "remove"
        });
    }

    submitHandler = (e)=>{
        e.preventDefault();
        const data = {
            id: this.state.id,
            cid: this.state.cid,
            action: this.state.action
        };
        console.log(data);
        axios.post(`http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3001/course/${this.state.cid}/people`,data)
        .then((result)=>{
            if(result.data.data.message==="error"){
                alert("Something went wrong.")
            }
            else if(result.data.data.message==="success"){

                    alert("Action Performed.");
                    window.location.reload();
                ;
            }
        });
    }

  render() {
    return (
      <div className="persontab">
        <div className="row">
            <div className="col-2 imagecol">         
                <img src="https://photos.gograph.com/thumbs/CSP/CSP992/male-profile-picture-vector-stock_k14386009.jpg" alt="profilepicture" className="personimage" />
            </div>
            <div className="col-8 namecol">
                <h6>{this.props.name}</h6>
            </div>
            <div className="col-2 statcol">
                {(Cookies.get('role')==="faculty")
                ?<form onSubmit={this.submitHandler}><button className="btn btn-danger" onClick={this.removeClick}>REMOVE</button></form>
                :null
                }
            </div>
        </div>
      </div>
    )
  }
}

export default Person
