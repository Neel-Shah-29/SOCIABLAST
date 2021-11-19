const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
const Cryptr = require('cryptr');
const Roomlist = require('./Modals/rooms')

app.use(cors);
const server = http.createServer(app);
const SignUpObject = require('./Modals/SignUpModal');

const dbURI = 'mongodb+srv://dhruv11:dhruv11@nodetuts.ugon2.mongodb.net/room?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("connected to mongodb"))
    .catch((err) => console.log(err));

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});


const url = process.env.MongoDB_Database_Url;
mongoose.connect(url)
    .then(() => {
        console.log("Successfully Connected to the SignUp Database of MongoDB.");
    })

//Printing the environment variables into the env file  :   console.log(process.env);

io.on("connection", (socket) => {
    console.log(`User Connected:${socket.id}`);



    socket.on('signUpSubmit', (object) => {
        let Modal = new SignUpObject({
            Username: object.username,
            Email: object.email,
            Password: object.password
        })
        SignUpObject.findOne({ "Email": Modal.Email })
            .then((data) => {
                if (data.Email === Modal.Email) {
                    console.log("User Already Exists for the corresponding Email.");
                }
                else {
                    Modal.save()
                        .then(() => {
                            console.log("User Registered Successfully.");
                        });
                }
            })
    })

    socket.on("create_Room", (data) => {
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
                }
                else {
                    roomlist.save()
                }
            })
    });

    socket.on("join_room", () => {
        let object = [];
        Roomlist.find().then((data) => {
            object = [...object, data];
            socket.emit("recieve_roomlist", object)
        })
    });
    socket.on('Joinroom', (object) => {
        Roomlist.findOne({ "roomcode": object.roomcode, "roomname": object.roomname })
            .then((data) => {
                if (data === null) {
                    console.log('Invalid roomcode or roomname.');
                }
                else {
                    let savedroomcode = Cryptr.decrypt(data.roomcode);
                    if (savedPassword === object.password && data.roomname === object.roomname) {
                        console.log('OK');
                    }
                    else {
                        console.log('Invalid roomname or roomcode');
                    }
                }
            })
    })

    socket.on('Disconnect', () => {
        console.log(`User Disconnected:${socket.id}`);
    });

});

server.listen(3001, () => {
    console.log("Backend Server Listening.");
});

/*
-Hiding API Keys    :
    Youtube Reference Video :   https://www.youtube.com/watch?v=17UVejOw3zA

*/