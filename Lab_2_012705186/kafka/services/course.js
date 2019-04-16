const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Courses = require('../models/courses');
var cu = require('../api/data')
var currentuser = cu.getUser();
var skip = 0;
var limit = 5;
var flag = 0;


function handle_request(msg, callback) {
    console.log('inside kafka page course');
    console.log("entered server course and page is ",msg.page );
    if (msg.page=="next" && flag!==1){   //Next page view
    skip +=5;
    console.log("Skip updated to +5 and new value is ",skip)
    }
    else if ((msg.page=="previous" ) && (skip != 0)){
    skip -=5;    //previous page view
    console.log("Skip updated to -5 and new value is"  ,skip)
    }
    let returnObj = {};
    if(currentuser.role == "faculty"){
        console.log("entered faculty course info")
    Courses.find({facultyid : currentuser.id}).skip(skip).limit(limit).sort({"courseid" : 1})
    .exec()
    .then(doc => { 
        if(skip > doc.length){
            flag=1;
        }
        var courses = [];
                for(let i=0;i<doc.length;i++){
                    let info={};
                    let studentdetails = [];
                    info.courseid = doc[i].courseid;
                    info.coursename = doc[i].coursename;
                    info.facultyid = doc[i].facultyid;
                    info.courseterm = doc[i].courseterm;
                    info.coursedept = doc[i].coursedept;
                    info.coursedescription = doc[i].coursedescription;
                    info.courseroom = doc[i].courseroom;
                    info.coursecapacity = doc[i].coursecapacity;
                    info.waitlistcapacity = doc[i].waitlistcapacity;
                  //  console.log("studnet info is ",doc[i].studentinfo)
                    
                    info.status = 'enrolled';                
                   // info.status = doc[i].studentinfo.status;
                    courses.push(info);
                    
                }
               // console.log(courses);
                returnObj.courses = courses;
                returnObj.message = "success";               
                returnObj.data = "Login successfully!";
                callback(null,returnObj);
    })
    .catch(err => {
        console.log("Error in course view inmongo db is ",err);
        returnObj.message = "error";
        returnObj.data = "Login";
        callback('err');
    })}
    else{

        console.log("entered student course info")
            Courses.find().skip(skip).limit(limit).sort({"courseid" : 1})
            .exec()
            .then(doc => { 
                var courses = [];
                        for(let i=0;i<doc.length;i++){
                            let info={};
                            let studentdetails = [];
                            info.courseid = doc[i].courseid;
                            info.coursename = doc[i].coursename;
                            info.facultyid = doc[i].facultyid;
                            info.courseterm = doc[i].courseterm;
                            info.coursedept = doc[i].coursedept;
                            info.coursedescription = doc[i].coursedescription;
                            info.courseroom = doc[i].courseroom;
                            info.coursecapacity = doc[i].coursecapacity;
                            info.waitlistcapacity = doc[i].waitlistcapacity;
                          //  console.log("studnet info is ",doc[i].studentinfo)
                            
                            info.status = 'enrolled';                
                           // info.status = doc[i].studentinfo.status;
                            courses.push(info);
                            
                        }
                       // console.log(courses);
                        returnObj.courses = courses;
                        returnObj.message = "success";               
                        returnObj.data = "Login successfully!";
                        callback(null,returnObj);
            })
            .catch(err => {
                console.log("Error in course view inmongo db is ",err);
                returnObj.message = "error";
                returnObj.data = "Login";
                callback('err');
            })
    
        }   
};

exports.handle_request = handle_request;