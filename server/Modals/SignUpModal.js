const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const Schema =mongoose.Schema;

const SignUp=new Schema({
    Username:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
});

SignUp.pre('save',async function(next){
    try{
        const salt=await bcrypt.genSalt(10);
        const HashedPassword=await bcrypt.hash(this.Password,salt);
        this.Password=HashedPassword;
        next();
    }
    catch(error){
        next(error);
    }
})

const SignUpModal=mongoose.model('RegisteredUser',SignUp);

module.exports=SignUpModal;