const mongoose = require("mongoose");
const { encrypt, decrypt } = require('../cryptionHandler');
const Schema = mongoose.Schema;
/*
const RoomsSchema=new Schema({
    RoomName:{
        type:String
    },
    RoomCode:{
        type:String
    }
})
*/
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
    RoomsJoined:[],
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
        next(error);
    }
})

const SignUpModal = mongoose.model('RegisteredUser', SignUp);

module.exports = SignUpModal;