const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Courses = require('../models/courses');
var cu = require('../api/data')    
var currentuser = cu.getUser();

var assignmentSkip = 4;
var assignmentoffset = 0;
var assignmentFlag = 0;

function handle_request(msg, callback) {
    console.log("entered server assignment");
    let returnObj = {};
    if (msg.page=="next"){   //Next page view
        assignmentSkip +=4;
        assignmentoffset += 4;
        console.log("assignmentSkip updated to +5 and new value is ",assignmentSkip)
        }
        else if ((msg.page=="previous" ) && ((assignmentSkip - 4) >= 0) ){
        if(assignmentSkip==0){    
        assignmentSkip -=4;    //previous page view
        assignmentoffset -= 4;
        console.log("assignmentSkip updated to -5 and new value is"  ,assignmentSkip)
        }
        else {
            assignmentSkip = 4;   
        }
        }
    Courses.find({courseid : msg.id})
    .exec()
    .then(doc => {
      var assignment = []; 
       if(assignmentSkip > doc[0].assignmentinfo.length)        
      if(assignmentSkip > doc[0].assignmentinfo.length){
        assignmentFlag = 1;  
        assignmentSkip = doc[0].assignmentinfo.length ;
      }    
      if(assignmentoffset >= assignmentSkip){
        assignmentoffset -= 4;
      } 
      console.log("latest value to calculate is assignmentoffset is "+assignmentoffset+" and people assignmentSkip is "+assignmentSkip)               

       for(let i = assignmentoffset;i<( doc[0].assignmentinfo.length);i++ ){
        let info={};
        //console.log("Entered mongoose quiz list and data is ",doc[0].assignmentinfo[i].assignment)
        info.assignment = doc[0].assignmentinfo[i].assignment;
        info.cid = msg.id;
        assignment.push(info);
     }   
    // console.log(assignment);
     returnObj.assignment = assignment;
     returnObj.message = "success";               
     returnObj.data = "assignment view successfully!";   
     callback(null,returnObj)
    })
    .catch(err => {
    console.log('Error in assignement view',err);
    returnObj.message = "error";
    returnObj.data = "Login";
    callback('err');
    })}
    exports.handle_request = handle_request;