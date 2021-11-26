const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const interviewSchema=new mongoose.Schema({
    creater:{
        type:ObjectId,
        ref:"userModel",
        required:true
    },
    startTime:{
        type:Number,
        required:true,
    },
    endTime:{
        type:Number,
        required:true,
    },
    participants:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("interviewModel",interviewSchema);