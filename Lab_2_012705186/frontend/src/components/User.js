//
import React, { Component } from 'react'

export class User extends Component {
  render() {
    return (
      <div>
       <label>user = {this.props.value} </label> 
      </div>
    )
  }
}

export default User
