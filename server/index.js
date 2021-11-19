const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const Roomlist = require('./models/rooms');
const { encrypt, decrypt } = require('./cryptionHandler');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", //url from which request is made i.e react
        methods: ["GET", "POST"],
    },
});
const dbURI = 'mongodb+srv://dhruv11:dhruv11@nodetuts.ugon2.mongodb.net/room?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("connected to mongodb"))
    .catch((err) => console.log(err));


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("createroom", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} created room: ${data.roomname}`);
        const roomlist = new Roomlist({
            roomname: data.roomname,
            roomcode: data.roomcode,
        })
        Roomlist.findOne({ "roomname": roomlist.roomname })
            .then((data) => {
                if (data !== null) {
                    console.log('Roomname already exists.');
                    let check = "Room already exists";
                    socket.emit("checksameroom", check)
                }
                else {
                    let c = "created  room successfully"
                    socket.emit("checksameroom", c)
                    roomlist.save()
                }
            })
    });


    // socket.on("join_room", () => {
    //     let object = [];
    //     Roomlist.find().then((data) => {
    //         object = [...object, data];
    //         socket.emit("recieve_roomlist", object)
    //     })
    // });
    socket.on('roomlogincheck', (object) => {
        Roomlist.findOne({ roomname: object.roomname })
            .then((data) => {
                if (data === null) {
                    let d = "Invalid roomname";
                    socket.emit("checkloginjoinroom", d)
                }
                else {
                    const obj = {
                        iv: data.iv,
                        roomcode: data.roomcode
                    }
                    const savedPassword = decrypt(obj);
                    if (savedPassword === object.roomcode) {
                        console.log('Logged in successfully.')
                        let f = "joined room";
                        socket.emit("checkloginjoinroom", f)
                    }
                    else {
                        let n = "Invalid Password.";
                        console.log('Invalid Password.');
                        socket.emit("checkloginjoinroom", n);
                    }
                }
            })
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});



server.listen(3001, () => {
    console.log("SERVER RUNNING");
});