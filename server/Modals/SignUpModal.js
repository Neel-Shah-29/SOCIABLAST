const mongoose=require("mongoose");
const Cryptr=require('cryptr');
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
        cryptr=new Cryptr('Sociablasts');
        let HashedPassword=cryptr.encrypt(this.Password);
        this.Password=HashedPassword;
        next();
    }
    catch(error){
        next(error);
    }
})

const SignUpModal=mongoose.model('RegisteredUser',SignUp);

module.exports=SignUpModal;