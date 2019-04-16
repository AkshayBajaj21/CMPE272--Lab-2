const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Messages = require('../models/messages');
var cu = require('../api/data')
var currentuser = cu.getUser();

var messageSkip = 2;
var messageoffset = 0;
var messagFlag = 0;
var messageCount = 1;

function handle_request(msg, callback) {
    const uname = currentuser.name
    console.log("entered message view",uname);
    let returnObj = {};
    if (msg.page=="next"){   //Next page view
        messageSkip +=2;
        messageoffset += 2;
        console.log("messageSkip updated to +2 and new value is ",messageSkip)
        }
        else if ((msg.page=="previous" ) && ((messageSkip - 2) >= 0) ){
        if(messageSkip==0){    
            messageSkip -=2;    //previous page view
            messageoffset -= 2;
        console.log("messageSkip updated to -2 and new value is"  ,messageSkip)
        }
        else {
            messageSkip = 2;   
        }
        }
    Messages.find({receiver : uname})
    .exec()
    .then(doc => { 
        console.log("entered mongo message and username is  ",doc.length)
        if(messageSkip > doc.length){
            messageFlag = 1;  
            messageSkip = doc.length ;
          }    
          if(messageoffset >= messageSkip && (messageFlag !=1)){
            messageoffset -= 2;
          } 
        var messages = [];
        for(let i = messageoffset;i<(messageSkip);i++){        
        let info={};
        info.receiver = doc[i].receiver;
        info.sender = doc[i].sender;
        info.time = doc[i].time;
        info.content= doc[i].content;
        messages.push(info);        
        }
        returnObj.messages = messages
        returnObj.message = "success";               
        returnObj.data = "message retrieved successfully!";
        callback(null,returnObj)
    
    })
    .catch( err => {
        console.log("entered mongo db profile view catch and error is ",err);
        returnObj.message = "error";
        returnObj.data = "message sent error";
        callback('err');
    })
}

exports.handle_request=handle_request