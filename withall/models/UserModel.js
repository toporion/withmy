const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","employee"],
        required:true
    },
    profileImage:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
})

const UserModel=mongoose.model('employees',userSchema)
module.exports=UserModel;