const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const userSchema=Schema({
    _id:Schema.Types.ObjectId,
    name:{type:String,require:true},
    email:{type:String,require:true},
    phoneNumber:{type:Number,require:true},
    address:{type:String,require:true},
    password:{type:String,require:true}
});
module.exports=mongoose.model("User",userSchema)