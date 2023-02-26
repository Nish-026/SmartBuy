const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    mobile:Number,
    email:String,
    password:String,
})
const userModel=mongoose.model("user",userSchema)

module.exports={
    userModel
}