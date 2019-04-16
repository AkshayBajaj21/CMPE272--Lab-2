const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Users = require('../models/users');
var cu = require('../api/data')    
var currentuser = cu.getUser();
    
function handle_request(msg, callback) {
  console.log('inside kafka edir profile');
        console.log("Data for updated profile in server side is :" ,msg);
        let returnObj = {}
        var userid = msg.id;
        var name = msg.name;
        var userid = currentuser.id;
        var email = msg.email;
        var cno = msg.cno;
        var city = msg.city;
        var company = msg.company;
        var hometown = msg.hometown;
        var country = msg.country;
        var school = msg.school;
        var gender = msg.gender;
        var about = msg.about;
       // let returnObj = {};
       // INSERT INTO course` (`courseid`, `facultyid`, `coursename`, `coursedept`, `coursedescription`, `courseroom`, `coursecapacity`, `waitlistcapacity`, `courseterm`) VALUES ('213', '121', 'cpme281', 'CE', 'test', '189', '21', '2', 's');
    
       Users.update({userid : msg.id },{name :msg.name , email : msg.email, phonenumber : msg.cno, aboutme : msg.about, city : msg.city, country : msg.country, company : msg.company, school : msg.school, hometown : msg.hometown, gender : msg.gender}).
       exec().then( result => {
              console.log("Entered update profile of mongoose db and result is ",result.nModified);
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
       console.log("Data sent from server profile edit is " , returnObj)
      }
      exports.handle_request = handle_request;
      // res.json(returnObj);
    //    var query = "UPDATE sjsu_canvas.users SET name='"+name+"', email='"+email+"',phonenumber='"+cno+"', aboutme='"+about+"', city='"+city+"', country='"+country+"', company='"+company+"', school='"+school+"', hometown='"+hometown+"', gender='"+gender+"' WHERE userid='"+userid+"'";
      //  var query = "SELECT userid, password FROM users WHERE userid = '"+id+"' AND password = '"+password+"'";
    //    console.log(query);
    //    pool.getConnection(function(err,con) {

    //     con.query(query, (err, result) => {
    //         try{
    //             if(result.affected   app.post("/profile/edit", (req,res) => {
