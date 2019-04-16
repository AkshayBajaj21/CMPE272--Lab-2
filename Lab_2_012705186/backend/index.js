 
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var mysql = require("mysql");
var session = require('express-session');
var currentuser = {};
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var passport = require("passport");
var config = require('./config/settings');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const someOtherPlaintextPassword = 'not_bacon';
const kafka = require("./kafka/client")
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
var multer = require('multer');
var path = require('path');


var filepath = "";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload/')
    },
    filename: function (req, file, cb) {
        filepath = file.originalname + Date.now() + path.extname(file.originalname)
        cb(null, filepath);
    }
});
var upload = multer({ storage: storage });


mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');

const Users = require('./models/users');
const Courses = require('./models/courses');
const Lectures = require('./models/lectures');
const Messages = require('./models/messages');
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(cors({origin:"http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3000"}));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,    
    activeDuration:  5 * 60 * 1000
}));
app.use(passport.initialize());
app.use(express.static(__dirname + '/public'));

// Bring in defined Passport Strategy
require('./config/passport')(passport);


// var con = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Cricket2012@",
//     database:"sjsu_canvas"
// });


// con.connect((err) => {
//     if(err) console.log(err.code);
//     else console.log("Database connection successful.");
// });
// var pool  = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'Cricket2012@',
//     database : 'sjsu_canvas',
//     port	 : 3306
// });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://ec2-54-215-144-28.us-west-1.compute.amazonaws.com:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


var currentUser = {};
var currentuser = {};

var skip = 0;
var limit = 5; //only five record per page will be shown

var peopleSkip = 4;
var offset = 0;
var peopleFlag = 0;


var assignmentSkip = 4;
var assignmentoffset = 0;
var assignmentFlag = 0;

var announcementSkip = 4;
var announcementoffset = 0;
var announcementFlag = 0;

var messageSkip = 2;
var messageoffset = 0;
var messagFlag = 0;
var messageCount = 1;

app.post("/login", (req,res) => {
    kafka.make_request('login1', req.body, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });

});

    // passport.authenticate('local',{successRedirect : '/',failureRedirect : '' })
//     console.log(req.body);
//     let returnObj = {};

//     var id = req.body.id;
//     var password = req.body.password;
//     Users.find({userid : id})
//     .exec()
//     .then(doc => {
//         if((!doc.length>0) && (!doc[0])){
//             console.log("entered if no user mongo db after login",doc.length);
//             //res.status(500); 
//             returnObj.message = "error";
//             console.log("response is",returnObj);
//             res.json(returnObj);
//         }
//         else {
//             console.log("From mongo db after login ", doc[0].name); //successfully logged in
//             let encrypted = "";
//             res.status(200);
//             console.log(res.statusCode); //returns 200 on successful login
//             new Promise((resolve,reject)=>{     
//             // console.log(result);
//             encrypted = doc[0].password;
//             resolve([encrypted,doc[0].role,doc[0].name,doc[0].phonenumber,doc[0].aboutme,doc[0].city,doc[0].country,doc[0].company,doc[0].school,doc[0].hometown,doc[0].language,doc[0].gender,doc[0].email]);

       
//     })
//     .then((value)=>{
//         new Promise((resolve, reject) => {
//             bcrypt.compare(password, value[0], (err, result) => {
//                 if (err) throw err;
//                 resolve([result,value[1],value[2],value[3],value[4],value[5],value[6],value[7],value[8],value[9],value[10],value[11],value[12]]);
//             });
//         })
//         .then((value) => {
//             if (value[0]) {

//                 returnObj.message = "success";
//                 currentuser.id = id;
//                 currentuser.role = value[1];
//                 currentuser.name = value[2];
//                 returnObj.id = id;
//                 returnObj.role = value[1];
//                 returnObj.name = value[2];
//                 returnObj.phonenumber = value[3];
//                 returnObj.aboutme = value[4];
//                 returnObj.city = value[5];
//                 returnObj.country = value[6];
//                 returnObj.company = value[7];
//                 returnObj.school = value[8];
//                 returnObj.hometown = value[9];
//                 returnObj.language = value[10];
//                 returnObj.gender = value[11];
//                 returnObj.email = value[12];
//                 currentUser.id = id;
//                 currentUser.role = value[1];
//                 currentUser.name = value[2];

//                 var user = {
//                     id : req.body.id,
//                     username: value[2]
//                 };
//                  const token = jwt.sign(
//                  user,                     
//                  config.secret,
//                  {
//                     expiresIn: 10080 // in seconds
//                  });
//                  returnObj.token = token;

//             }  
//             else {
//                 returnObj.message = "error";
//                 res.json(returnObj);
//             }
//             res.json(returnObj);
//         });

//     })
// }

//     })
//     .catch(err => {
//         console.log("Error is at 135" + err);
//     })


app.post("/course/new", (req,res) => {
    
    kafka.make_request('addcourse', req.body, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
})


   // let returnObj = {};
   // INSERT INTO course` (`courseid`, `facultyid`, `coursename`, `coursedept`, `coursedescription`, `courseroom`, `coursecapacity`, `waitlistcapacity`, `courseterm`) VALUES ('213', '121', 'cpme281', 'CE', 'test', '189', '21', '2', 's');

//     var query = "insert into course (courseid, facultyid, coursename, coursedept,coursedescription,courseroom,coursecapacity,waitlistcapacity,courseterm) values ('"+cid+"','"+facultyid+"','"+cname+"','"+cdept+"','"+cdes+"','"+croom+"','"+ccap+"','"+waitcap+"','"+cterm+"') ;"
//   //  var query = "SELECT userid, password FROM users WHERE userid = '"+id+"' AND password = '"+password+"'";
//    console.log(query);
//    pool.getConnection(function(err,con) {

//     con.query(query, (err, result) => {
//         try{
//             if(result.affectedRows === 1){
//                 console.log("success at backend cousradd starts");
//                 returnObj.message = "success";               
//                 returnObj.data = "signedup successfully!";
//                 console.log("success at backend cousradd end");
//             }}
//             catch{
//                 console.log("error at backend add");
//                 returnObj.message = "error";               
//                 returnObj.data = "signedup unsuccessfully!";
//             }
//             res.json(returnObj);
//         });
//     console.log("\nConnection closed..");
//         con.release();
    // });
// });

app.get("/course/:page", (req,res) => {
        req.params.msg = req.body
        kafka.make_request('course', req.params, function (err, results) {
            console.log(req.body);
            console.log('in result');
            console.log(results);
            if (err) {
                console.log("Inside err");
                res.json({
                    status: "error",
                    msg: "System Error, Try Again."
                })
            } else {
                console.log("Inside else");
                res.json({
                    data: results
                });
                res.end();
            }
        });
})
//     console.log("entered server course and page is ",req.params.page );
//     if (req.params.page=="next"){   //Next page view
//     skip +=5;
//     console.log("Skip updated to +5 and new value is ",skip)
//     }
//     else if ((req.params.page=="previous" ) && (skip != 0)){
//     skip -=5;    //previous page view
//     console.log("Skip updated to -5 and new value is"  ,skip)
//     }
//     let returnObj = {};
//     Courses.find({facultyid : currentuser.id}).skip(skip).limit(limit).sort({"courseid" : 1})
//     .exec()
//     .then(doc => { 
//         var courses = [];
//                 for(let i=0;i<doc.length;i++){
//                     let info={};
//                     let studentdetails = [];
//                     info.courseid = doc[i].courseid;
//                     info.coursename = doc[i].coursename;
//                     info.facultyid = doc[i].facultyid;
//                     info.courseterm = doc[i].courseterm;
//                     info.coursedept = doc[i].coursedept;
//                     info.coursedescription = doc[i].coursedescription;
//                     info.courseroom = doc[i].courseroom;
//                     info.coursecapacity = doc[i].coursecapacity;
//                     info.waitlistcapacity = doc[i].waitlistcapacity;
//                   //  console.log("studnet info is ",doc[i].studentinfo)
                    
//                     info.status = 'enrolled';                
//                    // info.status = doc[i].studentinfo.status;
//                     courses.push(info);
                    
//                 }
//                // console.log(courses);
//                 returnObj.courses = courses;
//                 returnObj.message = "success";               
//                 returnObj.data = "Login successfully!";
//                 res.json(returnObj);
//     })
//     .catch(err => {
//         console.log("Error in course view inmongo db is ",err);
//         returnObj.message = "error";
//         returnObj.data = "Login";
//         res.json(returnObj);
//     })    
// });

app.get("/course", (req,res) => {
    req.params.msg = req.body
    kafka.make_request('courses', req.params, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
})
    // console.log("User" + currentuser.id);
//     var query = "SELECT courseid,coursename,facultyid,courseterm,coursedept,coursedescription,courseroom,coursecapacity,waitlistcapacity,status FROM course WHERE facultyid = "+currentuser.id;
//     pool.getConnection(function(err,con) {

//     con.query(query, (err, result) => {
//             try {
//                 console.log("entered try");
//                 var courses = [];
//                 for(let i=0;i<result.length;i++){
//                     let info={};
//                     info.courseid = result[i].courseid;
//                     info.coursename = result[i].coursename;
//                     info.facultyid = result[i].facultyid;
//                     info.courseterm = result[i].courseterm;
//                     info.coursedept = result[i].coursedept;
//                     info.coursedescription = result[i].coursedescription;
//                     info.courseroom = result[i].courseroom;
//                     info.coursecapacity = result[i].coursecapacity;
//                     info.waitlistcapacity = result[i].waitlistcapacity;
//                     info.status = result[i].status;
//                     courses.push(info);
//                 }
//                 console.log(courses);
//                 returnObj.courses = courses;
//                 returnObj.message = "success";               
//                 returnObj.data = "Login successfully!";
       
//     } catch(err) {
//         console.log("entered catch");
//         returnObj.message = "error";
//         returnObj.data = "Login";
//     }
//     console.log(returnObj.courses);
//     res.json(returnObj);
//     });
//     console.log("\nConnection closed..");
//     con.release();
// });
    
// });

app.get('/protectedRoute', requireAuth, function (request, response) {
    response.send('Your User id is: ' + request.user.id + ', username is: ' + request.user.username + '.');
});

app.get("/profile", (req,res) => {
    kafka.make_request('profile', req.body, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });

});

    // pool.getConnection(function(err,con) {

    // con.query(query, (err, result) => {
    //         try {
    //             console.log("entered profile try");
    //             var profile = [];
               
    //                 let info={};
    //                 info.userid = result[0].userid;
    //                 info.email = result[0].email;
    //                 info.name = result[0].name
    //                 info.password = result[0].password;
    //                 info.role = result[0].role;
    //                 info.phonenumber = result[0].phonenumber;
    //                 info.aboutme = result[0].aboutme;
    //                 info.city = result[0].city;
    //                 info.country = result[0].country;
    //                 info.company = result[0].company;
    //                 info.school = result[0].school;
    //                 info.hometown = result[0].hometown;
    //                 info.language = result[0].language;
    //                 info.gender = result[0].gender;
    //                 profile.push(info);
                
    //         //    console.log(profile);
    //             returnObj.profile = profile;
    //             returnObj.message = "success";               
    //             returnObj.data = "profile view successfully!";
       
    // } catch(err) {
    //     console.log("entered catch");
    //     returnObj.message = "error";
    //     returnObj.data = "Login";
    // }
    
    
    // });
    // });eturn


app.get("/course/:id/people/:page", (req,res) => {
    req.params.msg = req.body;
    kafka.make_request('people', req.params, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });

});
    // var query = "select studentname,studentid from studentcourse where courseid ='"+req.params.id+"'";
    // pool.getConnection(function(err,con) {
    // con.query(query, (err, result) => {
    //         try {
    //             console.log("entered people try");
    //             var people = [];                  
    //             for(let i=0;i<result.length;i++){
    //                 let info={};
    //                 info.studentname = result[i].studentname;
    //                 info.studentid = result[i].studentid;
    //                 people.push(info);
    //             }
    //            console.log(people);
    //             returnObj.people = people;
    //             returnObj.message = "success";               
    //             returnObj.data = "people view successfully!";
       
    // } catch(err) {
    //     console.log("entered catch");
    //     returnObj.message = "error";
    //     returnObj.data = "Login";
    // }
    // console.log(returnObj.people);
    // res.json(returnObj);
    // });
    // console.log("\nConnection closed..");
    //     con.release();
    // });
// })

app.post("/course/:id/people", (req,res) => {
    req.params.msg = req.body;
    kafka.make_request('editpeople', req.params, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });

});
    // let returnObj = {};
    // Courses.updateOne({ courseid : req.body.cid }, { $pull : {studentinfo : { uid: req.body.id}}})
    // .exec()
    // .then( result => {
    //        console.log("Entered update people list of mongoose db and result is");
    //         if (result.nModified ===1){
    //          console.log("success at backend profile update");
    //          returnObj.message = "success";               
    //          returnObj.data = "profile list updated successfully!";
    //          console.log("profile update at backend cousradd end");
    //          res.json(returnObj);
    //       }
    // })
    // .catch(err => {
    //  console.log("Entered CATCH  update profile of mongoose db and error is ",err);
    //  returnObj.message = "error";               
    //  returnObj.data = "profile list unsuccessfully!";
    //  res.json(returnObj);
    // })
//     var query = "delete from studentcourse where courseid='"+req.body.cid+"' and studentid='"+req.body.id+"'";
//     console.log(query);
//     pool.getConnection(function(err,con) {
//     con.query(query, (err, result) => {
//             try {console.log("entered remove student server try");
//                 if(result.affectedRows===1){
//                     console.log("entered remove student server try success");
//                     returnObj.message="success";
//                 }
//                 else
//                 { console.log("entered remove student server try fail");
//                     returnObj.message = "error";
//                 }
//                } 
//     catch(err) {
//         console.log("entered remove student server catch");
//         returnObj.message = "error";
        
//     }
//   //  console.log(returnObj.people);
//     res.json(returnObj);
//     });
//     console.log("\nConnection closed..");
//         con.release();
//     });
// })
app.post("/course/:id/announcement", (req,res) => {
    req.params.msg = req.body;
    kafka.make_request('editannouncement', req.params, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });

});
    // console.log("Data for new courses in server side is :" +req.body.title);
    // let returnObj = {}
    // var cid = req.params.id;
    // var title = req.body.title;
    // var content = req.body.content;
    // var info = {
    //     'title' : title,
    //     'content' : content
    //     }
    //     Courses.updateOne({'courseid': req.params.id }, {$push: {announcementinfo: info}})
    //     .exec()
    //     .then( result => {
    //            console.log("Entered update announcementinfo of mongoose db and result is");
    //             if (result.nModified ===1){
    //              console.log("success at backend announcementinfo update");
    //              returnObj.message = "success";               
    //              returnObj.data = "announcementinfo updated successfully!";
    //              console.log("announcementinfo update at backend cousradd end");
    //              res.json(returnObj);
    //           }
    //     })
    //     .catch(err => {
    //      console.log("Entered CATCH  update announcementinfo of mongoose db and error is ",err);
    //      returnObj.message = "error";               
    //      returnObj.data = "announcementinfo unsuccessfully!";
    //      res.json(returnObj);
    //     })
//   var query = "insert into announcement (title, content, courseid) values ('"+title+"','"+content+"','"+cid+"');"
//   //  var query = "SELECT userid, password FROM users WHERE userid = '"+id+"' AND password = '"+password+"'";
//    console.log(query);
//    pool.getConnection(function(err,con) {

//     con.query(query, (err, result) => {
//         try{
//             if(result.affectedRows === 1){
//                 console.log("success at backend announcement starts");
//                 returnObj.message = "success";               
//                 returnObj.data = "Added successfully!";
//                 console.log("success at backend announcement end");
//             }}
//             catch{
//                 console.log("error at backend add");
//                 returnObj.message = "error";               
//                 returnObj.data = "Added unsuccessfully!";
//             }
//             res.json(returnObj);
//         });
//     console.log("\nConnection closed..");
//         con.release();
//     });
// });
app.get("/course/:id/announcement/:page", (req,res) => {
    req.params.msg = req.body
    kafka.make_request('announcement', req.params, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
})
    // console.log("entered server announcement",req.params.page);
    //     let returnObj = {};
    //     if (req.params.page=="next"){   //Next page view
    //         announcementSkip +=4;
    //         announcementoffset += 4;
    //         console.log("announcementSkip updated to +5 and new value is ",announcementSkip)
    //         }
    //         else if ((req.params.page=="previous" ) && ((announcementSkip - 4) >= 0) ){
    //         if(announcementSkip==0){    
    //         announcementSkip -=4;    //previous page view
    //         announcementoffset -= 4;
    //         console.log("announcementSkip updated to -5 and new value is"  ,announcementSkip)
    //         }
    //         else {
    //             announcementSkip = 4;   
    //         }
    //         }
    //     Courses.find({courseid : req.params.id})
    //     .exec()
    //     .then(doc => {
    //       var announcement = [];                     
    //       if(announcementSkip > doc[0].announcementinfo.length){
    //         announcementFlag = 1;  
    //         announcementSkip = doc[0].announcementinfo.length ;
    //       }    
    //       if(announcementoffset >= announcementSkip){
    //         announcementoffset -= 4;
    //       } 
    //       console.log("total student are ",doc[0].announcementinfo.length)
    //       console.log("latest value to calculate is announcement offset is "+announcementoffset+" and announcement skip is "+announcementSkip)               
    //        for(let i = announcementoffset;i<announcementSkip;i++){
    //         let info={};
    //        // console.log("Entered mongoose quiz list and data is ",doc[0].announcementinfo[i].title)
    //         info.title = doc[0].announcementinfo[i].title;
    //         info.content = doc[0].announcementinfo[i].content;
    //         announcement.push(info);
    //      }   
    //     // console.log(announcement);
    //      returnObj.announcement = announcement;
    //      returnObj.message = "success";               
    //      returnObj.data = "announcement view successfully!";   
    //      res.json(returnObj);
    //     })
    //     .catch(err => {
    //     console.log('Error in announcement view',err);
    //     returnObj.message = "error";
    //     returnObj.data = "Login";
    //     res.json(returnObj);
    //     })
    // var query = "select title,content from announcement where courseid ='"+req.params.id+"'";
    // ;
    // pool.getConnection(function(err,con) {
    // con.query(query, (err, result) => {
    //         try {
    //             console.log("entered announcement try");
    //             var announcement = [];                  
    //             for(let i=0;i<result.length;i++){
    //                 let info={};
    //                 info.title = result[i].title;
    //                 info.content = result[i].content;
    //                 announcement.push(info);
    //             }
    //            console.log(announcement);
    //             returnObj.announcement = announcement;
    //             returnObj.message = "success";               
    //             returnObj.data = "people view successfully!";
       
    // } catch(err) {
    //     console.log("entered announcement catch");
    //     returnObj.message = "error";
    //     returnObj.data = "Login";
    // }
    // console.log(returnObj.announcement);
    // res.json(returnObj);
    // });
    // console.log("\nConnection closed..");
    //     con.release();
    // });
// })

app.get("/course/:id/quiz", (req,res) => {
    req.params.msg = req.body
    kafka.make_request('quiz', req.params, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
})
    // console.log("entered server quiz");
    // let returnObj = {};
    // Courses.find({courseid : req.params.id})
    // .exec()
    // .then(doc => {
    //   var quiz = [];                     
    //    for(let i = 0;i<doc[0].quizinfo.length;i++ ){
    //     let info={};
    //     console.log("Entered mongoose quiz list and data is ",doc[0].quizinfo[i].quizname)
    //     info.quizid = doc[0].quizinfo[i].quizid;
    //     info.quizname = doc[0].quizinfo[i].quizname;
    //     info.q1 = doc[0].quizinfo[i].q1;
    //     info.q2 = doc[0].quizinfo[i].q2;
    //     info.q3 = doc[0].quizinfo[i].q3;
    //     quiz.push(info);
    //  }   
    //  console.log(quiz);
    //  returnObj.quiz = quiz;
    //  returnObj.message = "success";               
    //  returnObj.data = "people view successfully!";   
    //  res.json(returnObj);
    // })
    // .catch(err => {
    // console.log('Error in people list view',err);
    // returnObj.message = "error";
    // returnObj.data = "Login";
    // res.json(returnObj);
    // })
    // var query = "select quizid,quizname,q1,q2,q3 from Quiz where courseid ='"+req.params.id+"'";
    // ;
    // pool.getConnection(function(err,con) {
    // con.query(query, (err, result) => {
    //         try {
    //             console.log("entered quiz try");
    //             var quiz = [];                  
    //             for(let i=0;i<result.length;i++){
    //                 let info={};
    //                 info.quizid = result[i].quizid;
    //                 info.quizname = result[i].quizname;
    //                 info.q1 = result[i].q1;
    //                 info.q2 = result[i].q2;
    //                 info.q3 = result[i].q3;
    //                 quiz.push(info);
    //             }
    //            console.log(quiz);
    //             returnObj.quiz = quiz;
    //             returnObj.message = "success";               
    //             returnObj.data = "people view successfully!";
       
    // } catch(err) {
    //     console.log("entered quiz catch");
    //     returnObj.message = "error";
    //     returnObj.data = "Login";
    // }
    // console.log(returnObj.quiz);
    // res.json(returnObj);
    // });
    // console.log("\nConnection closed..");
    //     con.release();
    // });
// })

app.get("/course/:id/assignment/:page", (req,res) => {
    req.params.msg = req.body
    kafka.make_request('assignment', req.params, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
})
    // console.log("entered server assignment");
    // let returnObj = {};
    // if (req.params.page=="next"){   //Next page view
    //     assignmentSkip +=4;
    //     assignmentoffset += 4;
    //     console.log("assignmentSkip updated to +5 and new value is ",assignmentSkip)
    //     }
    //     else if ((req.params.page=="previous" ) && ((assignmentSkip - 4) >= 0) ){
    //     if(assignmentSkip==0){    
    //     assignmentSkip -=4;    //previous page view
    //     assignmentoffset -= 4;
    //     console.log("assignmentSkip updated to -5 and new value is"  ,assignmentSkip)
    //     }
    //     else {
    //         assignmentSkip = 4;   
    //     }
    //     }
    // Courses.find({courseid : req.params.id})
    // .exec()
    // .then(doc => {
    //   var assignment = [];          
    //   if(assignmentSkip > doc[0].assignmentinfo.length){
    //     assignmentFlag = 1;  
    //     assignmentSkip = doc[0].assignmentinfo.length ;
    //   }    
    //   if(assignmentoffset >= assignmentSkip){
    //     assignmentoffset -= 4;
    //   } 
    //   console.log("latest value to calculate is assignmentoffset is "+assignmentoffset+" and people assignmentSkip is "+assignmentSkip)               

    //    for(let i = assignmentoffset;i<(assignmentSkip);i++ ){
    //     let info={};
    //     //console.log("Entered mongoose quiz list and data is ",doc[0].assignmentinfo[i].assignment)
    //     info.assignment = doc[0].assignmentinfo[i].assignment;
    //     info.cid = req.params.id;
    //     assignment.push(info);
    //  }   
    // // console.log(assignment);
    //  returnObj.assignment = assignment;
    //  returnObj.message = "success";               
    //  returnObj.data = "assignment view successfully!";   
    //  res.json(returnObj);
    // })
    // .catch(err => {
    // console.log('Error in assignement view',err);
    // returnObj.message = "error";
    // returnObj.data = "Login";
    // res.json(returnObj);
    // })
    // // var query = "select cid,assignment from assignment where cid ='"+req.params.id+"'";
    // ;
    // pool.getConnection(function(err,con) {
    // con.query(query, (err, result) => {
    //         try {
    //             console.log("entered assignment try");
    //             var assignment = [];                  
    //             for(let i=0;i<result.length;i++){
    //                 let info={};
    //                 info.assignment = result[i].assignment;
    //                 info.cid = result[i].cid;
    //                 assignment.push(info);
    //             }
    //            console.log(assignment);
    //             returnObj.assignment = assignment;
    //             returnObj.message = "success";               
    //             returnObj.data = "assignment view successfully!";
       
    // } catch(err) {
    //     console.log("entered assignment catch");
    //     returnObj.message = "error";
    //     returnObj.data = "Login";
    // }
    // console.log("Json data sent to client"+returnObj);
    // res.json(returnObj);
    // });
    // console.log("\nConnection closed..");
    //     con.release();
//     // });
// })
 app.get("/course/:id/information", (req,res) => {
     req.params.msg = req.body
    kafka.make_request('courseinfo', req.params, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
})    
//     console.log("entered server information");
//     let returnObj = {};
//     let uid = currentuser.id;
//     let studentStatus;
//     console.log(uid);
//     Courses.find({courseid : req.params.id})
//     .exec()
//     .then(doc => {
//         //   console.log("length of students is" ,doc[0].studentinfo[0].uid)
//           for (let i=0; i < doc[0].studentinfo.length; i++){
//           if(doc[0].studentinfo[i].uid === 2012){
//             studentStatus = doc[0].studentinfo[i].status;
//             console.log("studnet status is at 572",studentStatus);
//           }
//       }
//        if (!studentStatus){
//         returnObj.status = "none";
//        } 
//        else{
//         console.log("The status is "+ studentStatus)
//         returnObj.status = studentStatus;  
//        }
//        var information = [];                  
               
//        let info={};
//        info.cid = doc[0].courseid;
//        info.department = doc[0].coursedept;
//        info.faculty = doc[0].facultyid;
//        info.description = doc[0].coursedescription;
//        info.classroom = doc[0].courseroom;
//        info.term = doc[0].courseterm;
//        info.totalcapacity = doc[0].coursecapacity;
//        info.waitlist = doc[0].waitlistcapacity;
//        information.push(info);
   
//        console.log(information);
//        returnObj.information = information;  
//        returnObj.message = "success";             
//        res.json(returnObj);
//      })
//     .catch(err => {
//      console.log("entered information view from mongo db CACTCH and error is ",err);
//      res.json(returnObj);
//     })
    
    
    // var query1 = "select status from studentcourse where courseid = '"+req.params.id+"'and studentid  ="+uid;
    // console.log(query1);
    // pool.getConnection(function(err,con) {
    //     con.query(query1, (err, result) => {
    //             try {console.log("entered status information try");  
    //            if(!result[0]){
    //             returnObj.status = "none";
    //            }
    //            else{
    //                console.log("The status is "+ result[0].status)
    //                returnObj.status = result[0].status;
    //            }
    //             } catch(err) {
    //                 console.log("entered status information catch");
    //                 returnObj.message = "error";
    //             }    
    //             });
    //             console.log("\nConnection closed..");
    //                 con.release();
    //             });
    // var query = "select * from information where cid = '"+req.params.id+"'";
    // console.log(query);
    // pool.getConnection(function(err,con) {
    // con.query(query, (err, result) => {
    //         try {
    //             console.log("entered information try");
    //             var information = [];                  
               
    //                 let info={};
    //                 info.cid = result[0].cid;
    //                 info.department = result[0].department;
    //                 info.faculty = result[0].faculty;
    //                 info.description = result[0].description;
    //                 info.classroom = result[0].classroom;
    //                 info.term = result[0].term;
    //                 info.totalcapacity = result[0].totalcapacity;
    //                 info.waitlist = result[0].waitlist;
    //                 // info.status = result[0].status;
    //                 information.push(info);
                
    //            console.log(information);
    //             returnObj.information = information;
    //             res.json(returnObj);
    //             returnObj.message = "success";               
    //            // returnObj.data = "people view successfully!";
       
    // } catch(err) {
    //     console.log("entered information catch");
    //     returnObj.message = "error";
    //     res.json(returnObj);
    //    // returnObj.data = "Login";
    // }
    // console.log(returnObj.message);
    // console.log(returnObj.status);
    // res.json(returnObj);
    // });
    // console.log("\nConnection closed..");
    //     con.release();
    // });
// })

app.post("/course/:id/information", (req,res) => {
     req.params.msg = req.body
    kafka.make_request('editcourseinfo', req.params, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
})  

//     console.log("entered server delete information");
//     let userid = currentuser.id
//     let cid = req.params.id
//     let returnObj = {};
//     if(req.body.action==="drop"){
//         console.log("entered action == drop"); 
//         Courses.updateOne({ courseid : cid }, { $pull : {studentinfo : { uid: userid}}})
//         .exec()
//         .then( result => {
//                console.log("Entered update profile of mongoose db and result is");
//                 if (result.nModified ===1){
//                  console.log("success at backend profile update");
//                  returnObj.message = "success";               
//                  returnObj.data = "profile updated successfully!";
//                  console.log("profile update at backend cousradd end");
//                  res.json(returnObj);
//               }
//         })
//         .catch(err => {
//          console.log("Entered CATCH  update profile of mongoose db and error is ",err);
//          returnObj.message = "error";               
//          returnObj.data = "signedup unsuccessfully!";
//          res.json(returnObj);
//         })    
// //     var query = "delete from studentcourse where courseid='"+req.params.id+"' and studentid ="+currentUser.id
// //     console.log(query);
// //     pool.getConnection(function(err,con) {
// //     con.query(query, (err, result) => {
// //             try {console.log("entered  delete information server try");
// //                 if(result.affectedRows===1){
// //                     console.log("entered  delete information server try success");
// //                     returnObj.message="success";
// //                 }
// //                 else
// //                 { console.log("entered  delete information server try fail");
// //                     returnObj.message = "error";
// //                 }
// //                } 
// //     catch(err) {
// //         console.log("entered  delete information server catch");
// //         returnObj.message = "error";
// //     }
// //   //  console.log(returnObj.people);
// //     res.json(returnObj);
// //     });
// //     console.log("\nConnection closed..");
// //         con.release();
// //     });

// }
// else if(req.body.action==="enroll"||req.body.action==="waitlist"){
//     let cuid = currentuser.id;
//     let cuname = currentuser.name;
//     var info = {
//     'uid' : cuid,
//     'uname' : cuname,
//     'status' : req.body.action   
//     }
//     Courses.update({'courseid': req.params.id }, {$push: {studentinfo: info}})
//     .exec()
//     .then( result => {
//            console.log("Entered update profile of mongoose db and result is");
//             if (result.nModified ===1){
//              console.log("success at backend profile update");
//              returnObj.message = "success";               
//              returnObj.data = "profile updated successfully!";
//              console.log("profile update at backend cousradd end");
//              res.json(returnObj);
//           }
//     })
//     .catch(err => {
//      console.log("Entered CATCH  update profile of mongoose db and error is ",err);
//      returnObj.message = "error";               
//      returnObj.data = "signedup unsuccessfully!";
//      res.json(returnObj);
//     })
//     // Courses.update({'courseid': req.params.id }, {$push: {studentinfo: info}})
//     console.log('updated courses');
//     // new Promise((resolve,reject)=>{
//     //     query1 = "select facultyid from course where courseid='"+req.params.id+"'"
//     //     console.log(query1);
//     //     con.query(query1,(err,result)=>{
//     //         if(err){
//     //             returnObj.message="error";
//     //            // res.json(returnObj);
//     //         }
//     //         fid=result[0].facultyid;
//     //         resolve([req.params.id,fid,req.body.action]);
//     //     })
//     // })
//     // .then((value)=>{
//     //     query = "insert into studentcourse (courseid,facultyid,studentid,studentname,status) values ('"+value[0]+"','"+value[1]+"','"+currentuser.id+"','"+currentuser.name+"','"+value[2]+"');";
//     //    console.log(query);
//     //     con.query(query,(err,result)=>{
//     //         if(err){
//     //             returnObj.message="error";
//     //             res.json(returnObj);
//     //         }
//     //         returnObj.message="success";
//     //         console.log("Enrol updated "+ returnObj.message)
//     //         res.json(returnObj);
//     //     })
//     // })
// }
// })

    app.post("/profile/edit", (req,res) => {
        kafka.make_request('editprofile', req.body, function (err, results) {
            console.log(req.body);
            console.log('in result');
            console.log(results);
            if (err) {
                console.log("Inside err");
                res.json({
                    status: "error",
                    msg: "System Error, Try Again."
                })
            } else {
                console.log("Inside else");
                res.json({
                    data: results
                });
                res.end();
            }
        });
    
    });
    //     console.log("Data for updated profile in server side is :" ,req.body);
    //     let returnObj = {}
    //     var userid = req.body.id;
    //     var name = req.body.name;
    //     var userid = currentuser.id;
    //     var email = req.body.email;
    //     var cno = req.body.cno;
    //     var city = req.body.city;
    //     var company = req.body.company;
    //     var hometown = req.body.hometown;
    //     var country = req.body.country;
    //     var school = req.body.school;
    //     var gender = req.body.gender;
    //     var about = req.body.about;
    //    // let returnObj = {};
    //    // INSERT INTO course` (`courseid`, `facultyid`, `coursename`, `coursedept`, `coursedescription`, `courseroom`, `coursecapacity`, `waitlistcapacity`, `courseterm`) VALUES ('213', '121', 'cpme281', 'CE', 'test', '189', '21', '2', 's');
    
    //    Users.update({userid : req.body.id },{name :req.body.name , email : req.body.email, phonenumber : req.body.cno, aboutme : req.body.about, city : req.body.city, country : req.body.country, company : req.body.company, school : req.body.school, hometown : req.body.hometown, gender : req.body.gender}).
    //    exec().then( result => {
    //           console.log("Entered update profile of mongoose db and result is ",result.nModified);
    //           if (result.nModified ===1){
    //             console.log("success at backend profile update");
    //             returnObj.message = "success";               
    //             returnObj.data = "profile updated successfully!";
    //             console.log("profile update at backend cousradd end");
    //             res.json(returnObj);
    //           }
    //    })
    //    .catch(err => {
    //     console.log("Entered CATCH  update profile of mongoose db and error is ",err);
    //     returnObj.message = "error";               
    //     returnObj.data = "signedup unsuccessfully!";
    //     res.json(returnObj);
    //    })
    //    console.log("Data sent from server profile edit is " , returnObj)
      // res.json(returnObj);
    //    var query = "UPDATE sjsu_canvas.users SET name='"+name+"', email='"+email+"',phonenumber='"+cno+"', aboutme='"+about+"', city='"+city+"', country='"+country+"', company='"+company+"', school='"+school+"', hometown='"+hometown+"', gender='"+gender+"' WHERE userid='"+userid+"'";
      //  var query = "SELECT userid, password FROM users WHERE userid = '"+id+"' AND password = '"+password+"'";
    //    console.log(query);
    //    pool.getConnection(function(err,con) {

    //     con.query(query, (err, result) => {
    //         try{
    //             if(result.affectedRows === 1){
    //                 console.log("success at backend profile update");
    //                 returnObj.message = "success";               
    //                 returnObj.data = "profile updated successfully!";
    //                 console.log("profile update at backend cousradd end");
    //             }}
    //             catch{
    //                 console.log("error at backend add");
    //                 returnObj.message = "error";               
    //                 returnObj.data = "signedup unsuccessfully!";
    //             }

    //         });
    //         console.log("\nConnection closed..");
    //         con.release();
    //     });
    // }); 
app.post("/signup", (req,res) => {
    kafka.make_request('signup', req.body, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });

});
       // res.json(returnObj);
    // var query = "INSERT INTO users (userid, name, email, password, role) VALUES ('"+id+"', '"+name+"', '"+email+"', '"+check+"', '"+role+"')";
    
    // pool.getConnection(function(err,con) {

    //     con.query(query, (err, result) => {
    // try{
    //         if(result.affectedRows === 1){
    //             console.log("success at backend signup");
    //             returnObj.message = "success";               
    //             returnObj.data = "signedup successfully!";
    //         }}
    //         catch{
    //             console.log("error at backend signup");
    //             returnObj.message = "error";               
    //             returnObj.data = "signedup unsuccessfully!";
    //         }
            
    //     });
    //     console.log("\nConnection closed..");
    //     con.release();
    // });
//  }).catch(err => {
//      console.log(err);
//      returnObj.message = "error";               
//      returnObj.data = "signedup unsuccessfully!";
//      res.json(returnObj);
//  })
    
// });

app.get("/course/:id/file", (req, res) => {
    req.params.body= req.body
    req.params.filepath= filepath
    kafka.make_request('file', req.params, function (err, results) {
        console.log(req.params.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
})
    // let returnObj = {};
    //     Lectures.find({cid:req.params.id})
    //     .select("cid fname fpath")
    //     .exec()
    //     .then(doc => { 
    //             var lectures = [];
    //                 for(let i=0;i<doc.length;i++){
    //                     let info={};
    //                     info.cid = doc[i].cid;
    //                     info.fname = doc[i].fname;
    //                     info.fpath = doc[i].fpath;
    //                     lectures.push(info);   
    //                     console.log(info)     
    //                 }
    //                 returnObj.lectures = lectures;
    //                 returnObj.data = doc;
    //                 returnObj.message = "success";
    //                 res.json(returnObj);})
    //     .catch(err => {
    //     console.log(err);
    //     })
    // });

app.post("/course/:id/file",upload.single('lecturefile'),(req,res)=>{
    req.params.msg = req.file;
    kafka.make_request('addfile', req.params, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
})
//     let returnObj = {};
//     if(req.file){
//         // console.log(req.file);
//         const lectures = new Lectures({
//             _id: new mongoose.Types.ObjectId(),
//             cid :   req.params.id,
//             fname : req.file.originalname,
//             fpath : filepath   
//         });
//         lectures.save().then(result => {
//            console.log("Entered update people list of mongoose db and result is",result);
//             // if (result.nModified ===1){
//              console.log("success at backend profile update");
//              returnObj.message = "success";    
//              returnObj.data = "file added successfully!";
//              console.log("file added successfully!");
//              res.json(returnObj);
//         //   }
//     })
//     .catch(err => {
//      console.log("Entered CATCH  file added of mongoose db and error is ",err);
//      returnObj.message = "error";             
//      res.json(returnObj);
//     })
//     }
//     else{
//         res.send("error");
//           }
// });

app.get("/message/:page", (req,res) => {
    req.params.msg = req.file;
    kafka.make_request('message', req.params, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
})
//     const uname = 'anshuman'
//     console.log("entered message view",uname);
//     let returnObj = {};
//     if (req.params.page=="next"){   //Next page view
//         messageSkip +=2;
//         messageoffset += 2;
//         console.log("messageSkip updated to +2 and new value is ",messageSkip)
//         }
//         else if ((req.params.page=="previous" ) && ((messageSkip - 2) >= 0) ){
//         if(messageSkip==0){    
//             messageSkip -=2;    //previous page view
//             messageoffset -= 2;
//         console.log("messageSkip updated to -2 and new value is"  ,messageSkip)
//         }
//         else {
//             messageSkip = 2;   
//         }
//         }
//     Messages.find({receiver : uname})
//     .exec()
//     .then(doc => { 
//         console.log("entered mongo message and username is  ",doc.length)
//         if(messageSkip > doc.length){
//             messageFlag = 1;  
//             messageSkip = doc.length ;
//           }    
//           if(messageoffset >= messageSkip){
//             messageoffset -= 2;
//           } 
//         var messages = [];
//         for(let i = messageoffset;i<(messageSkip);i++){        
//         let info={};
//         info.receiver = doc[i].receiver;
//         info.sender = doc[i].sender;
//         info.time = doc[i].time;
//         info.content= doc[i].content;
//         messages.push(info);        
//         }
//         returnObj.messages = messages
//         returnObj.message = "success";               
//         returnObj.data = "message retrieved successfully!";
//         res.json(returnObj);
    
//     })
//     .catch( err => {
//         console.log("entered mongo db profile view catch and error is ",err);
//         returnObj.message = "error";
//         returnObj.data = "message sent error";
//         res.json(returnObj);
//     })
// })

app.post("/message",(req,res)=>{
    kafka.make_request('sendmessage', req.body, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    })
});
//     let returnObj = {};
//     let uname = currentUser.name;
//         const messages = new Messages({
//             _id: new mongoose.Types.ObjectId(),
//             sender :     uname,
//             receiver :   req.body.receiver,
//             content :    req.body.content,
//         });
//         messages.save().then(result => {
//            console.log("Entered messages addition of mongoose db and result is",result);
//             // if (result.nModified ===1){
//              console.log("success at backend messages update");
//              returnObj.message = "success";    
//              returnObj.data = "messages added successfully!";
//              console.log("messages added successfully!");
//              res.json(returnObj);
//         //   }
//     })
//     .catch(err => {
//      console.log("Entered CATCH  messages added of mongoose db and error is ",err);
//      returnObj.message = "error";             
//      res.json(returnObj);
//     })
// });

app.post("/course/:id/quiz", (req,res) => {
    req.params.msg = req.body;
    kafka.make_request('createquiz', req.params, function (err, results) {
        console.log(req.body);
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                data: results
            });
            res.end();
        }
    });
})

app.post("/course/:id/assignment", (req,res) => {
    console.log("Data for new courses in server side is :" +req.body.content);
    let returnObj = {}
    var cid = req.params.id;
    var content = req.body.content;
    var info = {'assignment' : content}
        Courses.updateOne({'courseid': req.params.id }, {$push: {assignmentinfo: info}})
        .exec()
        .then( result => {
            //    console.log("Entered update announcementinfo of mongoose db and result is");
                if (result.nModified ===1){
                //  console.log("success at backend announcementinfo update");
                 returnObj.message = "success";               
                 returnObj.data = "announcementinfo updated successfully!";
                //  console.log("announcementinfo update at backend cousradd end");
                 res.json(returnObj);
              }
        })
        .catch(err => {
         console.log("Entered CATCH  update announcementinfo of mongoose db and error is ",err);
         returnObj.message = "error";               
         returnObj.data = "announcementinfo unsuccessfully!";
         res.json(returnObj);
        })
    })

app.listen(3001,() =>
    console.log("Server started on port 3001")
);

