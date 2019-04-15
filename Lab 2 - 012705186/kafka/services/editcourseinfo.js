const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Courses = require('../models/courses');
var cu = require('../api/data')    
var currentuser = cu.getUser();

function handle_request(msg, callback) {
        console.log("entered kafka edit  course information");
        console.log("entered server delete information");
        let userid = currentuser.id
        let cid = msg.id
        console.log("user id in edit profile :",cid)
        let returnObj = {};
        if(msg.msg.action==="drop"){
            console.log("entered action == drop"); 
            Courses.updateOne({ courseid : cid }, { $pull : {studentinfo : { uid: userid}}})
            .exec()
            .then( result => {
                   console.log("Entered update profile of mongoose db and result is",result);
                    if (result.nModified ===1){
                     console.log("success at backend profile update");
                     returnObj.message = "success";               
                     returnObj.data = "profile updated successfully!";
                     console.log("profile update at backend cousradd end");
                     callback(null,returnObj);
                  }
            })
            .catch(err => {
             console.log("Entered CATCH  update profile of mongoose db and error is ",err);
             returnObj.message = "error";               
             returnObj.data = "signedup unsuccessfully!";
             callback('err');
            })       
    }
    else if(msg.msg.action==="enroll"||msg.msg.action==="waitlist"){
        console.log("entered action ",msg.msg.action); 
        let cuid = currentuser.id;
        let cuname = currentuser.name;
        var info = {
        'uid' : cuid,
        'uname' : cuname,
        'status' : msg.msg.action   
        }
        Courses.update({'courseid': msg.id }, {$push: {studentinfo: info}})
        .exec()
        .then( result => {
               console.log("Entered update profile of mongoose db and result is",result.nModified);
                if (result.nModified ===1){
                 console.log("success at backend profile update");
                 returnObj.message = "success";               
                 returnObj.data = "profile updated successfully!";
                 console.log("profile update at backend cousradd end");
                 callback(null,returnObj)
              }
        })
        .catch(err => {
         console.log("Entered CATCH  update profile of mongoose db and error is ",err);
         returnObj.message = "error";               
         returnObj.data = "signedup unsuccessfully!";
         callback('err');
        })
        // Courses.update({'courseid': req.params.id }, {$push: {studentinfo: info}})
        console.log('updated courses');
    }
    }

    exports.handle_request = handle_request;