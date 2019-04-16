const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Courses = require('../models/courses');
var cu = require('../api/data')    
var currentuser = cu.getUser();

function handle_request(msg, callback) {
    console.log("entered kafka view  course information");
    let returnObj = {};
    let uid2 = currentuser.id;
    let ccid  = msg.id
    let studentStatus;
    console.log(uid2);
    Courses.find({courseid : ccid})
    .exec()
    .then(doc => {
          var l = doc[0].studentinfo.length;
          console.log("length of students is" ,doc[0].studentinfo[0])
          console.log("length of students is" ,l)
          console.log("length of students is" ,doc[0].studentinfo[1].uid)
          console.log("length of students is" ,uid2)
          console.log("length of students is" ,doc[0].studentinfo[1].status)
          console.log("length of students is" ,uid2)
          for (let i=0; i < l; i++){
          console.log(" ",doc[0].studentinfo[i].uid)
          if((doc[0].studentinfo[i].uid) == uid2){
             
            studentStatus = doc[0].studentinfo[i].status;
            console.log("studnet status is at 572",studentStatus);
            
          }
      }
       if (studentStatus === 'enroll' || studentStatus ==='waitlist'){
        console.log("The status is present and is "+ studentStatus)
        returnObj.status = studentStatus;  
       } 
       else{
        studentStatus = "none"
        console.log("The status is "+ studentStatus)
        
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

    
