const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Courses = require('../models/courses');
var cu = require('../api/data')
var currentuser = cu.getUser();


function handle_request(msg, callback) {
    console.log("entered server quiz");
    let returnObj = {};
    Courses.find({courseid : msg.id})
    .exec()
    .then(doc => {
      var quiz = [];                     
       for(let i = 0;i<doc[0].quizinfo.length;i++ ){
        let info={};
        console.log("Entered mongoose quiz list and data is ",doc[0].quizinfo[i].quizname)
        info.quizid = doc[0].quizinfo[i].quizid;
        info.quizname = doc[0].quizinfo[i].quizname;
        info.q1 = doc[0].quizinfo[i].q1;
        info.q2 = doc[0].quizinfo[i].q2;
        info.q3 = doc[0].quizinfo[i].q3;
        quiz.push(info);
     }   
     console.log(quiz);
     returnObj.quiz = quiz;
     returnObj.message = "success";               
     returnObj.data = "people view successfully!";   
     callback(null,returnObj)
    })
    .catch(err => {
    console.log('Error in people list view',err);
    returnObj.message = "error";
    returnObj.data = "Login";
    callback('err');
    })

}

exports.handle_request=handle_request