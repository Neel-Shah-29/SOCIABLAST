const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
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

const url = process.env.MongoDB_Database_Url;
mongoose.connect(url)
    .then(() => {
        console.log("Conneected.");
    })

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("createroom", (data) => {
        let globalCreaterName=data.createrName;
        let globalRoomName=data.roomname;
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
                    let c = "created  room successfully";
                    SignUpObject.findOneAndUpdate({
                        Username:globalCreaterName
                    },{
                        $push:{
                            RoomsJoined:globalRoomName
                        }
                    }).then(()=>{
                        console.log('Data appended.');
                        let f = "joined room";
                        socket.emit("checkloginjoinroom", f)
                        socket.join(data.roomname)
                    })
                    socket.emit("checksameroom", c)
                    roomlist.save()
                        .then((result) => {
                            socket.join(result.roomname)
                        })
                }
            })
    });

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
        let uname=object.username;
        let rname=object.roomname;
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
                        console.log('Appending data.')
                        let flag=false;
                        SignUpObject.find({Username:uname})
                        .then((datas)=>{
                            let array=datas[0].RoomsJoined;
                            for(let i=0;i<array.length;i++){
                                if(array[i]===rname){

                                    flag=true;
                                }
                            }
                        })
                        .then(()=>{
                            if(flag===false){
                                SignUpObject.findOneAndUpdate({
                                    Username:uname
                                },{
                                    $push:{
                                        RoomsJoined:rname
                                    }
                                }).then(()=>{
                                    console.log('Data appended.');
                                    let f = "joined room";
                                    socket.emit("checkloginjoinroom", f)
                                    socket.join(data.roomname)
                                })
                            }
                            else if(flag===true){
                                console.log("Room Already Joined.")
                                let string="Room Already Joined.";
                                socket.emit('RoomAlreadyJoined',string);
                            }
                        })
                        //https://www.youtube.com/watch?v=gtUPPO8Re98->LINK FOR APPENDING THE DATA IN ARRAY.
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
    socket.on('getAlreadyJoinedRooms',(object)=>{
        let name=object.Username;
        SignUpObject.findOne({Username:name})
        .then((data)=>{
            console.log(data);
            console.log('Got all the joined chat rooms successfully.')
            socket.emit('takeAlreadyJoinedRooms',data.RoomsJoined);
        })
    })
    socket.on('JoinJoinedRooms',(data)=>{
        socket.join(data);
        socket.emit('gotJoinJoinedRooms',data);
        console.log('Backend of the JoinJoinedRooms.');
    })

    socket.on("send_message", (data) => {
        socket.to(data.roomname).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});



server.listen(3001, () => {
    console.log("Server Running.");
});