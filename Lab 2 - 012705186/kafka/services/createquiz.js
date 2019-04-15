const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Courses = require('../models/courses');
var cu = require('../api/data')    
var currentuser = cu.getUser();


function handle_request(msg, callback) {
    console.log("Data for new quiz in server side is :" ,msg);
    let returnObj = {}
    var cid = msg.id;
    var quizname = msg.msg.quizname;
    var q11 = msg.msg.q1;
    var q21 = msg.msg.q2;
    var q12 = msg.msg.op11;
    var q22 = msg.msg.op12;
    var q13 = msg.msg.op21;
    var q23 = msg.msg.op22;

    var quiz = [{
        'quizid' : 1,
        'quizname' : quizname,
        'q1' : q11,
        'q2' : q12,
        'q3'  : q22
        },{
            'quizid' : 2,
            'quizname' : quizname,
            'q1' : q21,
            'q2' : q13,
            'q3'  : q23
            }]
        Courses.updateOne({'courseid': cid}, {$push: {quizinfo: quiz}})
        .exec()
        .then( result => {
               console.log("Entered update quiz of mongoose db and result is",result.nModified);
                if (result.nModified ===1){
                 console.log("success at backend announcementinfo update");
                 returnObj.message = "success";               
                 returnObj.data = "announcementinfo updated successfully!";
                 console.log("announcementinfo update at backend cousradd end");
                 callback(null,returnObj);
              }
        })
        .catch(err => {
         console.log("Entered CATCH  update announcementinfo of mongoose db and error is ",err);
         returnObj.message = "error";               
         returnObj.data = "announcementinfo unsuccessfully!";
         callback('err')
        })}

        exports.handle_request=handle_request