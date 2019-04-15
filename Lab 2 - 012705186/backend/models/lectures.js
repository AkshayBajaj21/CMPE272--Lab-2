const mongoose =require("mongoose");

const lectureSchema = mongoose.Schema({
 _id : mongoose.Schema.Types.ObjectId,
 cid :           Number,
 fname :         String, 
 fpath :         String
});

module.exports = mongoose.model('Lectures',lectureSchema);