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
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        filepath = file.originalname + Date.now() + path.extname(file.originalname)
        cb(null, filepath);
    }
});
var upload = multer({ storage: storage });

function handle_request(msg, callback) {
    let returnObj = {};
        Lectures.find({cid:msg.id})
        .select("cid fname fpath")
        .exec()
        .then(doc => { 
                var lectures = [];
                    for(let i=0;i<doc.length;i++){
                        let info={};
                        info.cid = doc[i].cid;
                        info.fname = doc[i].fname;
                        info.fpath = doc[i].fpath;
                        lectures.push(info);   
                        console.log(info)     
                    }
                    returnObj.lectures = lectures;
                    returnObj.data = doc;
                    returnObj.message = "success";
                    callback(null,returnObj);})
        .catch(err => {
        callback('err');
        })
    };

    exports.handle_request=handle_request;