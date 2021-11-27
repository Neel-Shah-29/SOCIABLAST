const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
<<<<<<< HEAD
const Roomlist = require('./Modals/rooms');
const SignUpObject = require('./Modals/SignUpModal');
const { encrypt, decrypt } = require('./cryptionHandler');
const { Encrypt, Decrypt } = require('./cryptionHandler1');
require('dotenv').config();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

=======
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


>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
const url = process.env.MongoDB_Database_Url;
mongoose.connect(url)
    .then(() => {
        console.log("Successfully Connected to the SignUp Database of MongoDB.");
    })

<<<<<<< HEAD
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("createroom", (data) => {
=======
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
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
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
<<<<<<< HEAD
                    let check = "Room already exists";
                    socket.emit("checksameroom", check)
                }
                else {
                    let c = "created  room successfully"
                    socket.emit("checksameroom", c)
                    roomlist.save()
                        .then((result) => {
                            socket.join(result.roomname)
                        })
=======
                }
                else {
                    roomlist.save()
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
                }
            })
    });

<<<<<<< HEAD
    socket.on('signUpSubmit', (object) => {
        let Modal = new SignUpObject({
            Username: object.username,
            Email: object.email,
            Password: object.password
        })
        let a = ''
        SignUpObject.findOne({ "Email": Modal.Email })
            .then((data) => {
                if (data !== null) {
                    console.log('User Already Exists for the corresponding Email.');
                    a = 'User Already Exists for the corresponding Email.'
                    socket.emit('signupsubmit', a)
                }
                else {
                    console.log('User registered Successfully.');
                    Modal.save().then((result) => {
                        a = 'User registered Successfully.'
                        socket.emit('signupsubmit', a)
                    });
                }
            })
    }
    )
    socket.on('loginSubmit', (object) => {
        let status = "";
        SignUpObject.findOne({ Username: object.Username, Email: object.Email })
            .then((data) => {
                if (data === null) {
                    console.log('Invalid USERNAME or EMAIL.');
                    status = 'Invalid USERNAME or EMAIL.';
                }
                else {
                    const obj = {
                        iv: data.iv,
                        password: data.Password,
                    }
                    const savedPassword = decrypt(obj);
                    if (savedPassword === object.Password) {
                        console.log('Logged in successfully.');
                        status = 'Logged in successfully.';
                    }
                    else {
                        console.log('Invalid Password.');
                        status = 'Invalid Password.';
                    }
                }
                socket.emit('loginStatus', status);
            })
    }
    )
    socket.on('roomlogincheck', (object) => {
        console.log(object);
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
                    const savedPassword = Decrypt(obj);
                    if (savedPassword === object.roomcode) {
                        console.log('Logged in successfully.')
                        SignUpObject.findOne({ Username: object.username })
                            .then((datas) => {
                                console.log(datas);


                            })
                        let f = "joined room";
                        socket.emit("checkloginjoinroom", f)
                        socket.join(data.roomname)
                    }
                    else {
                        let n = "Invalid Password.";
                        console.log('Invalid Password.');
                        socket.emit("checkloginjoinroom", n);

                    }
                }
            })
    }
    )
    socket.on("send_message", (data) => {
        socket.to(data.roomname).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});



server.listen(3001, () => {
    console.log("SERVER RUNNING");
});
=======
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
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
