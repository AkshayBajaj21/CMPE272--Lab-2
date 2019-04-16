const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Courses = require('../models/courses');
var cu = require('../api/data')    
var currentuser = cu.getUser();

var peopleSkip = 4;
var offset = 0;
var peopleFlag = 0;

function handle_request(msg, callback) {
    console.log("entered kafka view  course information");
    console.log("entered server people");
    let returnObj = {};
    if (msg.page=="next" ){   //Next page view
        peopleSkip +=4;
        offset += 4;
        console.log("peopleSkip updated to +5 and new value is ",peopleSkip)
        }
        else if ((msg.page=="previous" ) && ((peopleSkip - 4) >= 0) ){
        if(peopleFlag==0){    
        peopleSkip -=4;    //previous page view
        offset -= 4;
        console.log("peopleSkip updated to -5 and new value is"  ,peopleSkip)
        }
        else {
            peopleSkip = 4;   
        }
        }
    Courses.find({courseid : msg.id})
    .exec()
    .then(doc => {
      var people = []; 
      if(peopleSkip > doc[0].studentinfo.length){
        peopleFlag = 1;  
        peopleSkip = doc[0].studentinfo.length ;
      }    
      if(offset >= peopleSkip){
        offset -= 4;
      } 
      console.log("total student are ",doc[0].studentinfo.length)
      console.log("latest value to calculate is offset is "+offset+" and people skip is "+peopleSkip)               
       for(let i = offset;i<(peopleSkip);i++){
        let info={};
       // console.log("Entered mobgoose people list and data is ",doc[0].studentinfo[i].uname)
        info.studentname = doc[0].studentinfo[i].uname;
        info.studentid = doc[0].studentinfo[i].uid;
        people.push(info);
     }   
  //   console.log(people);
     returnObj.people = people;
     returnObj.status = 200;
     returnObj.message = "success";               
     returnObj.data = "people view successfully!";    
      callback(null,returnObj);
    })
    .catch(err => {
    console.log('Error in people list view',err);
    returnObj.message = "error";
    returnObj.data = "Login";
    callback('err')
    })}

    exports.handle_request = handle_request;