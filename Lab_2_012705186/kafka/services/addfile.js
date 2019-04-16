var multer = require('multer');
var path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Lectures = require('../models/lectures');
var cu = require('../api/data')
var currentuser = cu.getUser();

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


function handle_request(msg, callback) {
    let returnObj = {};
    if(msg.msg){
        // console.log(req.file);
        const lectures = new Lectures({
            _id: new mongoose.Types.ObjectId(),
            cid :   msg.id,
            fname : msg.msg.originalname,
            fpath : filepath   
        });
        lectures.save().then(result => {
           console.log("Entered update people list of mongoose db and result is",result);
            // if (result.nModified ===1){
             console.log("success at backend profile update");
             returnObj.message = "success";    
             returnObj.data = "file added successfully!";
             console.log("file added successfully!");
             callback(null,returnObj);
        //   }
    })
    .catch(err => {
     console.log("Entered CATCH  file added of mongoose db and error is ",err);
     returnObj.message = "error";             
     callback('err');
    })
    }
    else{
        res.send("error");
          }
}

exports.handle_request=handle_request