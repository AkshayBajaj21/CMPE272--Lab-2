const mongoose =require("mongoose");

const messageSchema = mongoose.Schema({
 _id :      mongoose.Schema.Types.ObjectId,
 sender :   String,
 receiver : String, 
 time :     {type: Date, default: Date.now },
 content :  String
});

module.exports = mongoose.model('Messages',messageSchema);