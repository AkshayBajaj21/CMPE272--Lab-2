const mongoose =require("mongoose");

const courseSchema = mongoose.Schema({
 _id : mongoose.Schema.Types.ObjectId,
 courseid :           Number,
 facultyid :          Number,
 coursename :         String, 
 courseterm :         String,
 coursedept :         String, 
 coursedescription :  String,
 courseroom :         String,
 coursecapacity :     String,
 waitlistcapacity :   String,
 studentinfo :        [{uid : Number,uname : String,status : String}],
 quizinfo :           [{quizid : Number, quizname : String, q1 : String,q2 : String,q3 : String}],
 assignmentinfo :     [{aid : Number,assignment : String}],
 announcementinfo :   [{title : String, content : String}],
 productImage:        {type : String}
});

module.exports = mongoose.model('Courses',courseSchema);