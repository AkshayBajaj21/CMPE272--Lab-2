const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Messages = require('../models/messages');
var cu = require('../api/data')
var currentuser = cu.getUser();

function handle_request(msg, callback) {
    let returnObj = {};
    let uname = currentuser.name;
        const messages = new Messages({
            _id: new mongoose.Types.ObjectId(),
            sender :     uname,
            receiver :   msg.receiver,
            content :    msg.content,
        });
        messages.save().then(result => {
           console.log("Entered messages addition of mongoose db and result is",result);
            // if (result.nModified ===1){
             console.log("success at backend messages update");
             returnObj.message = "success";    
             returnObj.data = "messages added successfully!";
             console.log("messages added successfully!");
             callback(null,returnObj);
        //   }
    })
    .catch(err => {
     console.log("Entered CATCH  messages added of mongoose db and error is ",err);
     returnObj.message = "error";             
     callback('err');
    })
};

exports.handle_request=handle_request;