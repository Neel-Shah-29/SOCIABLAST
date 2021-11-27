const mongoose = require('mongoose');
const Schema = mongoose.Schema;
<<<<<<< HEAD
const { Encrypt, Decrypt } = require('../cryptionHandler1');

const roomSchema = new Schema({ 
=======
const Cryptr = require('cryptr');

const roomSchema = new Schema({ //schema defines the structure of our document.
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
    roomcode: {
        type: String,
        required: true
    },
    roomname: {
        type: String,
        required: true
    },
<<<<<<< HEAD
    iv: {
        type: String
    }
}, { timestamps: true });
 
roomSchema.pre('save', async function (next) {
    try {
        const object = await Encrypt(this.roomcode);
        this.roomcode = object.roomcode;
        this.iv = object.iv;
=======
}, { timestamps: true }); //this line means whenever we change our blog it will auto update in database.

//model surrounds schema and provides us with an interface to connect with that database connection for that document type 
roomSchema.pre('save', async function (next) {
    try {
        Cryptr = new Cryptr();
        let HashedPassword = cryptr.encrypt(this.roomcode);
        this.roomcode = HashedPassword;
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
        next();
    }
    catch (error) {
        next(error);
    }
})
const Roomlist = mongoose.model('roomlist', roomSchema);

module.exports = Roomlist;