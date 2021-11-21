<<<<<<< HEAD
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
=======
const express=require('express');
const app=express();
const cors=require('cors');
const http=require('http');
const { Server }=require('socket.io');
const mongoose=require('mongoose');
const Roomlist = require('./Modals/rooms');
const SignUpObject=require('./Modals/SignUpModal');
const {encrypt,decrypt}=require('./cryptionHandler');
const { Encrypt, Decrypt } = require('./cryptionHandler1');
require('dotenv').config();

app.use(cors);
const server=http.createServer(app);


const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
});


const url=process.env.MongoDB_Database_Url;
mongoose.connect(url)
.then(()=>{
    console.log("Successfully Connected to the SignUp Database of MongoDB.");
})

//Printing the environment variables into the env file  :   console.log(process.env);

io.on("connection",(socket)=>{
    console.log(`User Connected:${socket.id}`);
    
    socket.on("createroom", (data) => {
        console.log(data);
>>>>>>> b186b7e0763bc613c6c2c8a8e671c17c05f7bcd8
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
<<<<<<< HEAD
=======
                    console.log(`User with ID: ${socket.id} created room: ${roomlist.roomname}`);
>>>>>>> b186b7e0763bc613c6c2c8a8e671c17c05f7bcd8
                    let c = "created  room successfully"
                    socket.emit("checksameroom", c)
                    roomlist.save()
                }
            })
    });

<<<<<<< HEAD

    // socket.on("join_room", () => {
    //     let object = [];
    //     Roomlist.find().then((data) => {
    //         object = [...object, data];
    //         socket.emit("recieve_roomlist", object)
    //     })
    // });
=======
    socket.on('signUpSubmit',(object)=>{
        let Modal=new SignUpObject({
            Username:object.username,
            Email:object.email,
            Password:object.password
        })
        SignUpObject.findOne({"Email":Modal.Email})
        .then((data)=>{
            if(data!==null){
                console.log('User Already Exists for the corresponding Email.');
            }
            else{
                console.log('User registered Successfully.');
                Modal.save();
            }
        })
    })
    
>>>>>>> b186b7e0763bc613c6c2c8a8e671c17c05f7bcd8
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
<<<<<<< HEAD
                    const savedPassword = decrypt(obj);
                    if (savedPassword === object.roomcode) {
                        console.log('Logged in successfully.')
                        let f = "joined room";
                        socket.emit("checkloginjoinroom", f)
=======
                    const savedPassword = Decrypt(obj);
                    if (savedPassword === object.roomcode) {
                        console.log('Logged in successfully.')
                        let f = "joined room";
                        socket.emit("checkloginjoinroom", f);
                        socket.to(data.roomcode).emit('receive_message',data);
>>>>>>> b186b7e0763bc613c6c2c8a8e671c17c05f7bcd8
                    }
                    else {
                        let n = "Invalid Password.";
                        console.log('Invalid Password.');
                        socket.emit("checkloginjoinroom", n);
                    }
                }
            })
    })
<<<<<<< HEAD
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
=======

    socket.on("send_message", (data) => {
        console.log(data);
        socket.emit("receive_message", data);
    });

    socket.on('loginSubmit',(object)=>{
        let status="";
        SignUpObject.findOne({Username:object.Username,Email:object.Email})
        .then((data)=>{
            if(data===null){
                console.log('Invalid USERNAME or EMAIL.');
                status='Invalid USERNAME or EMAIL.';
            }
            else{
                const obj={
                    iv:data.iv,
                    password:data.Password
                }
                const savedPassword=decrypt(obj);
                if(savedPassword===object.Password){
                    console.log('Logged in successfully.');
                    status='Logged in successfully.';
                }
                else{
                    console.log('Invalid Password.');
                    status='Invalid Password.';
                }
            }
            socket.emit('loginStatus',status);
        })
    })

    socket.on('Disconnect',()=>{
        console.log(`User Disconnected:${socket.id}`);
    });

});

server.listen(3001,()=>{
    console.log("Backend Server Listening.");
});

/*
-Hiding API Keys    :
    Youtube Reference Video :   https://www.youtube.com/watch?v=17UVejOw3zA
*/
>>>>>>> b186b7e0763bc613c6c2c8a8e671c17c05f7bcd8
