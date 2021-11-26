const mongoose = require('mongoose');
const emailValidator=require('email-validator');
const crypt=require('crypto');
const { v4: uuidv4 } = require('uuid');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    encry_password:{
        type:String,
        minlength:7,
        required:true
    },
    salt:String,
    resume:{
        type:String,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    meetings:{
        type:Array,
        default:[]
    }

})

userSchema.virtual("password").set(function(password){
    this._password=password;
    this.salt=uuidv4();
    this.encry_password=this.securePassword(password)
}).get(function(){
    return this._password;
})

userSchema.methods={
    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)==this.encry_password;
    },
    securePassword: function(plainPassword){
        if(!plainPassword)return "";
        try{
            return crypt.createHmac("sha256",this.salt).update(plainPassword).digest("hex");
        }catch(err){
            return ""
        }
    }
}

const userModel=mongoose.model("userModel",userSchema);

module.exports=userModel;