const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Encrypt, Decrypt } = require('../cryptionHandler1');

const roomSchema = new Schema({ 
    roomcode: {
        type: String,
        required: true
    },
    roomname: {
        type: String,
        required: true
    },
    iv: {
        type: String
    }
}, { timestamps: true });
 
roomSchema.pre('save', async function (next) {
    try {
        const object = await Encrypt(this.roomcode);
        this.roomcode = object.roomcode;
        this.iv = object.iv;
        next();
    }
    catch (error) {
        next(error);
    }
})
const Roomlist = mongoose.model('roomlist', roomSchema);

module.exports = Roomlist;