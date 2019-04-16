const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Courses = require('../models/courses');
var cu = require('../api/data')    
var currentuser = cu.getUser();

var announcementSkip = 4;
var announcementoffset = 0;
var announcementFlag = 0;


function handle_request(msg, callback) {
    console.log("entered server announcement",msg.page);
        let returnObj = {};
        if (msg.page=="next"){   //Next page view
            announcementSkip +=4;
            announcementoffset += 4;
            console.log("announcementSkip updated to +5 and new value is ",announcementSkip)
            }
            else if ((msg.page=="previous" ) && ((announcementSkip - 4) >= 0) ){
            if(announcementSkip==0){    
            announcementSkip -=4;    //previous page view
            announcementoffset -= 4;
            console.log("announcementSkip updated to -5 and new value is"  ,announcementSkip)
            }
            else {
                announcementSkip = 4;   
            }
            }
        Courses.find({courseid : msg.id})
        .exec()
        .then(doc => {
          var announcement = [];                     
          if(announcementSkip > doc[0].announcementinfo.length){
            announcementFlag = 1;  
            announcementSkip = doc[0].announcementinfo.length ;
          }    
          if(announcementoffset >= announcementSkip && (announcementFlag != 1)){
            announcementoffset -= 4;
          } 
          console.log("total student are ",doc[0].announcementinfo.length)
          console.log("latest value to calculate is announcement offset is "+announcementoffset+" and announcement skip is "+announcementSkip)               
           for(let i = announcementoffset;i<announcementSkip;i++){
            let info={};
           // console.log("Entered mongoose quiz list and data is ",doc[0].announcementinfo[i].title)
            info.title = doc[0].announcementinfo[i].title;
            info.content = doc[0].announcementinfo[i].content;
            announcement.push(info);
         }   
        // console.log(announcement);
         returnObj.announcement = announcement;
         returnObj.message = "success";               
         returnObj.data = "announcement view successfully!";   
         callback(null,returnObj);
        })
        .catch(err => {
        console.log('Error in announcement view',err);
        returnObj.message = "error";
        returnObj.data = "Login";
        callback(returnObj);
        })}
exports.handle_request=handle_request;
