var User = require('../../backend/models/users');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var cu = require('../api/data')
var userDetail = {};
const jwtSecret = "This is a JWT Secret!";
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
function handle_request(msg, callback) {
    console.log('inside kafka login1');
    let returnObj = {};
    var id = msg.id;
    var password = msg.password;
    Users.find({userid : id})
    .exec()
    .then(doc => {
        if((!doc.length>0) && (!doc[0])){
            console.log("entered if no user mongo db after login",doc.length);
            //res.status(500); 
            returnObj.message = "error";
            // console.log("response is",returnObj);
            callback('err');
        }
        else {
            console.log("From mongo db after login ", doc[0].name); //successfully logged in
            let encrypted = "";
            // res.status(200);
            // console.log(res.statusCode); //returns 200 on successful login
            new Promise((resolve,reject)=>{     
            // console.log(result);
            encrypted = doc[0].password;
            resolve([encrypted,doc[0].role,doc[0].name,doc[0].phonenumber,doc[0].aboutme,doc[0].city,doc[0].country,doc[0].company,doc[0].school,doc[0].hometown,doc[0].language,doc[0].gender,doc[0].email]);

       
    })
    .then((value)=>{
        new Promise((resolve, reject) => {
            bcrypt.compare(password, value[0], (err, result) => {
                if (err) throw err;
                resolve([result,value[1],value[2],value[3],value[4],value[5],value[6],value[7],value[8],value[9],value[10],value[11],value[12]]);
            });
        })
        .then((value) => {
            if (value[0]) {

                returnObj.message = "success";
                userDetail.id = id;
                userDetail.role = value[1];
                userDetail.name = value[2];
                cu.setUser(userDetail);
                returnObj.id = id;
                returnObj.role = value[1];
                returnObj.name = value[2];
                returnObj.phonenumber = value[3];
                returnObj.aboutme = value[4];
                returnObj.city = value[5];
                returnObj.country = value[6];
                returnObj.company = value[7];
                returnObj.school = value[8];
                returnObj.hometown = value[9];
                returnObj.language = value[10];
                returnObj.gender = value[11];
                returnObj.email = value[12];
                // currentUser.id = id;
                // currentUser.role = value[1];
                // currentUser.name = value[2];

                var user = {
                    id : msg.id,
                    username: value[2]
                };
                //  const token = jwt.sign(
                //  user,                     
                //  config.secret,
                //  {
                //     expiresIn: 10080 // in seconds
                //  });
                //  returnObj.token = token;

            }  
            else {
                returnObj.message = "error";
                callback(null,returnObj);
            }
            callback(null,returnObj);
        });

    })
}

    })
    .catch(err => {
        console.log("Error is at 135" + err);
    });
    }

    exports.handle_request = handle_request;
//     let returnObj = {};
//     let user = {
//         id: msg.id,
//         password: msg.password
//     }

//     User.findById(user, (err, result) => {
//         if (err || !result) {
//             returnObj.message = "nouser";
//             callback(null, returnObj);
//         }
//         else {
//             // console.log(result[0].password);
//             bcrypt.compare(user.password, result.password, (err, match) => {
//                 if (err || !match) {
//                     returnObj.message = "error";
//                     callback(err);
//                 } else {
//                     // use token
//                     var token = "JWT" + jwt.sign(user, jwtSecret, {
//                         expiresIn: 10080 // in seconds
//                     });
//                     // console.log(token);
//                     // currentUser.id = result.id;
//                     // currentUser.name = result.name;
//                     // currentUser.role = result.role;
//                     // currentUser.image = result.image;
//                     // currentUser.token = token;
//                     returnObj.message = "success";
//                     returnObj.data = result;
//                     returnObj.token = token;
//                     callback(null, returnObj);
//                 }
//             });
//         }
//     });
// };

