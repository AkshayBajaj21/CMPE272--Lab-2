const mongoose = require('mongoose');
// var jwt = require('jsonwebtoken');
// const jwtSecret = "This is a JWT Secret!";
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const saltRounds = 10;

function handle_request(msg, callback) {
    console.log('inside kafka signup');
    const id = msg.id;
    const name = msg.name;
    const email = msg.email;
    const password = msg.password;
    const role = msg.role;
    var status = false;
    let returnObj = {};
    console.log(id, name, email, password, role);

    new Promise((resolve, reject)=>{
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) throw err;
            // console.log(salt);
            bcrypt.hash(password,salt, (err, hashed) => {
                if(err) throw err;
                console.log(hashed);
                resolve(hashed);
            });
        });
    })
    .then((val)=>{
        console.log(val);
        var check = val;  
        const users = new Users({
            _id: new mongoose.Types.ObjectId(),
            name : msg.name,
            userid : msg.id,
            role : msg.role,
            password : check
        });
        users.save().then(result => {
         console.log("Entered mongoose user",result);          
         console.log("success at backend signup");
         returnObj.message = "success";               
         returnObj.data = "signedup successfully!";
        //  res.json(returnObj);
        callback(null,returnObj);

        })
        .catch(err => {
            console.log('Entered mongoose user error' , err);  
            returnObj.message = "error";               
            returnObj.data = "signedup unsuccessfully!";
            callback('err');
        });
    }).catch(err => {
        console.log(err);
        returnObj.message = "error";               
        returnObj.data = "signedup unsuccessfully!";
        callback('err');
    })
       
   };
 
   exports.handle_request = handle_request;  
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
