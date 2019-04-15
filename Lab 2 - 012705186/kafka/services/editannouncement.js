const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Courses = require('../models/courses');
var cu = require('../api/data')    
var currentuser = cu.getUser();


function handle_request(msg, callback) {
    console.log("Data for new courses in server side is :" +msg.msg.title);
    let returnObj = {}
    var cid = msg.id;
    var title = msg.msg.title;
    var content = msg.msg.content;
    var info = {
        'title' : title,
        'content' : content
        }
        Courses.updateOne({'courseid': msg.id }, {$push: {announcementinfo: info}})
        .exec()
        .then( result => {
               console.log("Entered update announcementinfo of mongoose db and result is");
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