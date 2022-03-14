const mongoose =require('mongoose');
const { Schema } = require('mongoose');


const NotesSchema = new Schema({
    "user":{
        type:mongoose.Schema.Types.ObjectId,     //this will act as foreign key which is user id key for user model
        ref:"user"
    },
    "title":{
        type:String,
        required:true,
        unique:true
    },
    "description":{
        type:String,
        required:true,

    },
    "tag":{
        type:String,
        required:true

    },
    "date":{
        type:Date,
        required:true,
        default:Date.now
    }
  });

  const notes=mongoose.model("notes",NotesSchema);
  module.exports=notes;