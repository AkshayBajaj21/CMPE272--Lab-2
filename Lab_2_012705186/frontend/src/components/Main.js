import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Profile from './Profile/Profile';
import EditProfile from './Profile/EditProfile';
import Message from './Message/Message';
import Courses from './Courses/Courses';
import Coursecreate from './Courses/Coursecreate';
import Coursesearch from './Courses/Coursesearch';
import Courseinfo from './Coursemenuitems/Courseinfo';
import People from './Coursemenuitems/People';
import Files from './Coursemenuitems/Files';
import Announcement from './Coursemenuitems/Announcement';
import Assignment from './Coursemenuitems/Assignment';
import Quiz from './Coursemenuitems/Quiz';
import Createquiz from './Coursemenuitems/Createquiz';
import Quizinfo from './Coursemenuitems/Quizinfo';
import Submission from './Coursemenuitems/Submission';

export class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
        <Route exact path="/navbar" component={Navbar} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/course/new" component={Coursecreate} />
        <Route exact path="/" component={Login} />
        <Route exact path="/course/:page" component={Courses} /> 
        <Route exact path="/course/:id/quiz" component={Quiz} /> 
        <Route exact path="/course/quiz/:id/info" component={Quizinfo} />
        <Route exact path="/course/quiz/:id/new" component={Createquiz} />
        <Route path="/course/:id/info" component={Courseinfo} />
        <Route path="/course/:id/announcement" component={Announcement} />
        <Route path="/course/:id/announcement/:page" component={Announcement} />
        <Route path="/course/:id/people" component={People} />
        <Route path="/course/:id/people/:page" component={People} />
        <Route path="/course/:id/assignment" component={Assignment} />
        <Route path="/course/:id/assignment/:page" component={Assignment} />
        <Route exact path="/course/:id/submission" component={Submission} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/course/search" component={Coursesearch} />       
        <Route exact path="/course/file" component={Files} />                
        <Route exact path="/course/:id/file" component={Files} /> 
        <Route exact path="/course" component={Courses} />
        <Route exact path="/profile/edit" component={EditProfile} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/message" component={Message} />
        <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

export default Main
