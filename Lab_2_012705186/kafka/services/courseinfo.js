const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Courses = require('../models/courses');
var cu = require('../api/data')    
var currentuser = cu.getUser();

function handle_request(msg, callback) {
    console.log("entered kafka view  course information");
    let returnObj = {};
    let uid = currentuser.id;
    let ccid  = msg.id
    let studentStatus;
    console.log(uid);
    Courses.find({courseid : ccid})
    .exec()
    .then(doc => {
        //   console.log("length of students is" ,doc[0].studentinfo[0].uid)
          for (let i=0; i < doc[0].studentinfo.length; i++){
          if(doc[0].studentinfo[i].uid === uid){
            studentStatus = doc[0].studentinfo[i].status;
            console.log("studnet status is at 572",studentStatus);
          }
      }
       if (studentStatus){
        console.log("The status is "+ studentStatus)
        returnObj.status = studentStatus;  
       } 
       else{
        console.log("The status is "+ studentStatus)
        returnObj.status = "none";
        returnObj.status = studentStatus;  
       }
       var information = [];                  
               
       let info={};
       info.cid = doc[0].courseid;
       info.department = doc[0].coursedept;
       info.faculty = doc[0].facultyid;
       info.description = doc[0].coursedescription;
       info.classroom = doc[0].courseroom;
       info.term = doc[0].courseterm;
       info.totalcapacity = doc[0].coursecapacity;
       info.waitlist = doc[0].waitlistcapacity;
       information.push(info);
   
       console.log(information);
       returnObj.information = information;  
       returnObj.message = "success";             
       callback(null,returnObj)
     })
    .catch(err => {
     console.log("entered information view from mongo db CACTCH and error is ",err);
     callback('err');
    }) }
   
    
    exports.handle_request = handle_request;

    
