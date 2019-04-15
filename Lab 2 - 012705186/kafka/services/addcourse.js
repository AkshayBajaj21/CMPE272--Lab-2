const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Courses = require('../models/courses');
var cu = require('../api/data')
var currentuser = cu.getUser();

function handle_request(msg, callback) {
    console.log("Data for new courses in server side is :" +msg.cid);
    let returnObj = {}
    var cid = msg.cid;
   // var facultyid = currentuser.id;
    var cname = msg.cname;
    var cdept = msg.cdept;
    var cdes = msg.cdes;    
    var croom = msg.croom;
    var ccap = msg.ccap;
    var waitcap = msg.waitcap;
    var cterm = msg.cterm;

    const courses = new Courses({
        _id: new mongoose.Types.ObjectId(),
        courseid : msg.cid,
        facultyid : currentuser.id,
        coursename : msg.cname,
        courseterm : msg.cterm,
        coursedept : msg.cdept,
        coursedescription :msg.cdes,
        courseroom : msg.croom,
        coursecapacity : msg.ccap,
        waitlistcapacity : msg.waitcap

    });
    courses.save().then(result => {
     console.log("Entered mongoose course",result);
     returnObj.message = "success";               
     returnObj.data = "course added successfully!";
     callback(null,returnObj)
    })
    .catch(err => {
        console.log('Entered mongoose user error' , err);  
        returnObj.message = "error";               
        returnObj.data = "course added unsuccessfully!";
        callback('err');
    })}

    exports.handle_request=handle_request
