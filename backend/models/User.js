const mongoose=require('mongoose');
const {Schema}=require('mongoose'); 

const UserSchema=new Schema({
    "name":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true,
        unique:true
    },
    "password":{
        type:String,
        required:true,
        unique:true
    },
    "date":{
        type:Date,
        required:true,
        default:Date.now
    }
})
const user=mongoose.model("user",UserSchema);
module.exports=user;