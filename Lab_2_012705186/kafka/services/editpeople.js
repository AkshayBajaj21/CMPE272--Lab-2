const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Courses = require('../models/courses');
var cu = require('../api/data')    
var currentuser = cu.getUser();

function handle_request(msg, callback) {
    console.log("entered server people");
    let returnObj = {};
    Courses.updateOne({ courseid : msg.msg.cid }, { $pull : {studentinfo : { uid: msg.msg.id}}})
    .exec()
    .then( result => {
           console.log("Entered update people list of mongoose db and result is");
            if (result.nModified ===1){
             console.log("success at backend profile update");
             returnObj.message = "success";               
             returnObj.data = "profile list updated successfully!";
             console.log("profile update at backend cousradd end");
             callback(null,returnObj);
          }
    })
    .catch(err => {
     console.log("Entered CATCH  update profile of mongoose db and error is ",err);
     returnObj.message = "error";               
     returnObj.data = "profile list unsuccessfully!";
     callback('err');
    }) }

    exports.handle_request = handle_request;