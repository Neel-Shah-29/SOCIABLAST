<<<<<<< HEAD
const mongoose = require("mongoose");
const { encrypt, decrypt } = require('../cryptionHandler');
const Schema = mongoose.Schema;

const RoomsSchema=new Schema({
    RoomName:{
        type:String
    },
    RoomCode:{
        type:String
    }
})

const SignUp = new Schema({
    Username: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    RoomsJoined:[RoomsSchema],
    iv: {
        type: String
    }
});

SignUp.pre('save', async function (next) {
    try {
        const object = await encrypt(this.Password);
        this.Password = object.password;
        this.iv = object.iv;
        next();
    }

    catch (error) {
=======
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
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
        next(error);
    }
})

<<<<<<< HEAD
const SignUpModal = mongoose.model('RegisteredUser', SignUp);

module.exports = SignUpModal;
=======
const SignUpModal=mongoose.model('RegisteredUser',SignUp);

module.exports=SignUpModal;
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
