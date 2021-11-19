const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cryptr = require('cryptr');

const roomSchema = new Schema({ //schema defines the structure of our document.
    roomcode: {
        type: String,
        required: true
    },
    roomname: {
        type: String,
        required: true
    },
}, { timestamps: true }); //this line means whenever we change our blog it will auto update in database.

//model surrounds schema and provides us with an interface to connect with that database connection for that document type 
roomSchema.pre('save', async function (next) {
    try {
        Cryptr = new Cryptr();
        let HashedPassword = cryptr.encrypt(this.roomcode);
        this.roomcode = HashedPassword;
        next();
    }
    catch (error) {
        next(error);
    }
})
const Roomlist = mongoose.model('roomlist', roomSchema);

module.exports = Roomlist;