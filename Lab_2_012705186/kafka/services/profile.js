const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Users = require('../models/users');
var cu = require('../api/data')
var currentuser = cu.getUser();
var peopleSkip = 4;
var offset = 0;
var peopleFlag = 0;

function handle_request(msg, callback) {
    console.log('inside kafka profile view');
    console.log("entered server profile");
    // let returnObj = {}
    let returnObj = {};
   // let userpid = currentuser.id;
    console.log("User" , currentuser.id);
 //   var query = "SELECT * FROM users WHERE userid = "+currentuser.id;
    Users.find({userid : currentuser.id})
    .exec()
    .then(doc => { 
        console.log("entered mongo profile and username is  ",doc[0].name )
        var profile = [];
        let info={};
        info.userid = doc[0].userid;
        info.password = doc[0].password;
        info.role = doc[0].role;
        info.phonenumber = doc[0].phonenumber;
        info.email = doc[0].email;
        info.name = doc[0].phonenumber;
        info.aboutme = doc[0].aboutme;
        info.city = doc[0].city;
        info.country = doc[0].country;
        info.company = doc[0].company;
        info.school = doc[0].school;
        info.hometown = doc[0].hometown;
        info.language = doc[0].language;
        info.gender = doc[0].gender;
        profile.push(info);
        returnObj.profile = profile;
        returnObj.message = "success";               
        returnObj.data = "profile view successfully!";
        callback(null,returnObj);
    })
    .catch( err => {
        // console.log("entered mongo db profile view catch and error is ",err);
        returnObj.message = "error";
        returnObj.data = "Login";
        callback('err');
    })
}

exports.handle_request = handle_request;