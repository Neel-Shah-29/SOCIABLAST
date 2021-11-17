const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const roomSchema = new Schema({ //schema defines the structure of our document.
    roomcode: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    roomname: {
        type: String,
        required: true
    },
}, { timestamps: true }); //this line means whenever we change our blog it will auto update in database.

//model surrounds schema and provides us with an interface to connect with that database connection for that document type 
roomSchema.pre('save', async function (next) { //this is a middleware it always executes after data is saved in database
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedpass = await bcrypt.hash(this.roomcode, salt)
        this.roomcode = hashedpass
        next()
    } catch (error) {
        next(error)
    }
})
const Roomlist = mongoose.model('roomlist', roomSchema);

module.exports = Roomlist;