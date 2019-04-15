const mongoose =require("mongoose");

const userSchema = mongoose.Schema({
 _id : mongoose.Schema.Types.ObjectId,
 userid :        Number,
 name :          String, 
 email :         String,
 password :      String, 
 role :          String,
 profileimage :  String,
 phonenumber :   Number,
 aboutme :       String,
 city :          String,
 country :       String,
 company :       String,
 school :        String,
 hometown :      String,
 language :      String,
 gender :        String
});

module.exports = mongoose.model('Users',userSchema);