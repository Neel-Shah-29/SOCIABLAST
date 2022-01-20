const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');
const mongoose = require('mongoose');
const Roomlist = require('./Modals/rooms');
const SignUpObject = require('./Modals/SignUpModal');
const { encrypt, decrypt } = require('./cryptionHandler');
const { Encrypt, Decrypt } = require('./cryptionHandler1');
const fetch = require('node-fetch');
const WIKIPEDIA = require('wikipedia');
const axios = require('axios');
const solenolyrics = require("solenolyrics");
const schedule = require('node-schedule');
require('dotenv').config();
const api = {
    key: "6f4a080b394bf3e3b171c15866a13d78",
    base: "https://api.openweathermap.org/data/2.5/"
}

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log('App started at port');
  })
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const url = process.env.MongoDB_Database_Url;

mongoose.connect(url)
    .then(() => {
        console.log("Connected.");
    })

if(process.env.NODE_ENV=== 'production'){
    app.use(express.static('../client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
  }
io.sockets.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("createroom", (data) => {
        let globalCreaterName = data.deluxe.Username;
        let globalRoomName = data.roomname;
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
                    let c = "Created  Room Successfully !";
                    SignUpObject.findOneAndUpdate({
                        Username: globalCreaterName
                    }, {
                        $push: {
                            RoomsJoined: globalRoomName
                        }
                    }).then(() => {
                        if (data !== null) {
                            console.log('Data appended.');
                            let f = "joined room";
                            socket.emit("checkloginjoinroom", f)
                            socket.join(data.roomname)
                        }
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
                    console.log('Invalid Username or Email.');
                    status = 'Invalid Username or Email';
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
        let uname = object.deluxe.Username;
        let rname = object.roomname;
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
                        let flag = false;
                        SignUpObject.find({ Username: uname })
                            .then((datas) => {
                                console.log(datas);
                                if (datas !== []) {
                                    let array = datas[0].RoomsJoined;
                                    for (let i = 0; i < array.length; i++) {
                                        if (array[i] === rname) {

                                            flag = true;
                                        }
                                    }
                                }
                            })
                            .then(() => {
                                if (flag === false) {
                                    SignUpObject.findOneAndUpdate({
                                        Username: uname
                                    }, {
                                        $push: {
                                            RoomsJoined: rname
                                        }
                                    }).then(() => {
                                        console.log('Data appended.');
                                        let f = "joined room";
                                        socket.emit("checkloginjoinroom", f)
                                        socket.join(data.roomname)
                                    })
                                }
                                else if (flag === true) {
                                    console.log("Room Already Joined.")
                                    let string = "Room Already Joined.";
                                    socket.emit('RoomAlreadyJoined', string);
                                }
                            })
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
    socket.on('getAlreadyJoinedRooms', (object) => {
        let name = object.Username;
        SignUpObject.findOne({ Username: name })
            .then((data) => {
                if (data !== null) {
                    console.log('Got all the joined chat rooms successfully.')
                    socket.emit('takeAlreadyJoinedRooms', data.RoomsJoined);
                }
            })
    })
    socket.on('JoinJoinedRooms', (data) => {
        socket.join(data);
        socket.emit('gotJoinJoinedRooms', data);
        console.log('Backend of the JoinJoinedRooms.');
    })

    socket.on("send_message", (data) => {
        console.log(data);
        //const clientsInRoom = await io.in(data.roomname).allSockets();
        //The above commented line is used to check the users present in thr room.
        socket.to(data.roomname).emit("receive_message", data);
    });

    socket.on("botmessage", (data) => {
        if (data.message.includes(".weather", 0)) {
            let s = "";
            for (let i = 9; i < data.message.length; i++) {
                s = s + data.message[i];
            }
            let query = s;
            let check = ".weather";
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    if (result.message !== 'city not found' && s != "") {
                        //    console.log(result);

                        data.message = [check, result.main.temp, result.sys.country, result.weather[0].main, s, result.main.temp_max, result.main.temp_min, result.main.humidity];
                        console.log(data.message)
                        socket.emit('botreporting', data);
                        socket.to(data.roomname).emit("botreporting", data);
                    }
                }
                );
        }
        else if (data.message.includes(".wikipedia", 0)) {
            let s = "";
            for (let i = 11; i < data.message.length; i++) {
                s = s + data.message[i];
            }
            let query = s;
            let check = ".wikipedia";
            (async () => {
                try {
                    const page = await WIKIPEDIA.page(query);
                    const summary = await page.summary();
                    console.log(summary.extract);
                    const paragraph = summary.extract;
                    data.message = [check, paragraph, s];
                    socket.emit('botreporting', data);
                    socket.to(data.roomname).emit("botreporting", data);
                } catch (error) {
                    console.log(error);
                }
            })()
        }
        else if (data.message.includes(".time", 0)) {
            let s = "";
            let check = ".time"
            for (let i = 6; i < data.message.length; i++) {
                s = s + data.message[i];
            }
            let query = s;
            axios.get(`https://timezone.abstractapi.com/v1/current_time/?api_key=7b9d1cd586ef4e05b2d9f1f48d1299c3&location=${query}`)
                .then(response => {
                    console.log(response.data);
                    data.message = [check, [response.data.datetime], [response.data.timezone_name], [response.data.timezone_location], [response.data.latitude], [response.data.longitude], s];
                    socket.emit('botreporting', data);
                    socket.to(data.roomname).emit("botreporting", data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else if (data.message.includes(".currency", 0)) {
            let s = "";
            let q = "";
            let amt = "";
            let check = ".currency"
            for (let i = 10; i < 13; i++) {
                s = s + data.message[i];
            }
            for (let i = 14; i < 17; i++) {
                q = q + data.message[i];
            }
            for (let i = 18; i < data.message.length; i++) {
                amt = amt + data.message[i];
            }
            let input = s.toString();
            let output = q.toString();
            console.log(input + output)
            fetch(`https://free-currency-converter.herokuapp.com/list/convert?source=${input}&destination=${output}&price=${amt}`)
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    data.message = [check, result.price, result.source, result.destination, result.converted_value];
                    socket.emit('botreporting', data);
                    socket.to(data.roomname).emit("botreporting", data);
                })
                .catch(err => {
                    console.error(err);
                });
        }


        else if (data.message.includes(".lyrics", 0)) {
            let s = "";
            let check = ".lyrics"
            for (let i = 8; i < data.message.length; i++) {
                s = s + data.message[i];
            }
            solenolyrics.requestLyricsFor(s).then(
                result => {
                    console.log(`${result}`);
                    data.message = [check, result, s];
                    socket.emit('botreporting', data);
                    socket.to(data.roomname).emit("botreporting", data);
                }
            );
        }
        else if (data.message.includes(".reminder", 0)) {
            let s = "";
            let check = ".reminder";
            let r = "";
            let t = "";
            let p = "";
            for (let i = 13; i < 15; i++) {
                s = s + data.message[i]
            }
            for (let i = 10; i < 12; i++) {
                p = p + data.message[i];
            }
            console.log(p)
            console.log(s)
            for (let i = 16; i < data.message.length; i++) {
                r = r + data.message[i]
            }
            const job = schedule.scheduleJob(s + ' ' + p + ' * * *', function () {
                console.log('task to be done:' + r);
                data.message = [check, s, p, r];
                socket.emit('botreporting', data);
                socket.to(data.roomname).emit("botreporting", data);
            });
        }
        else if (data.message.includes(".stocks", 0)) {
            let s = "";
            let check = ".stocks"
            for (let i = 8; i < data.message.length; i++) {
                s = s + data.message[i];
            }
            fetch(`https://api.polygon.io/v2/aggs/ticker/${s}/range/1/minute/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=jIlnqfE_thqvuCyzE1dI9aHSBbnMiQyH`)
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    data.message = [check, result.results[0].c, result.results[0].h, result.results[0].l];
                    socket.emit('botreporting', data);
                    socket.to(data.roomname).emit("botreporting", data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
        else if (data.message.includes(".covid", 0)) {
            let s = "";
            let check = ".covid";
            for (let i = 7; i < data.message.length; i++) {
                s = s + data.message[i];
            }
            axios.get(`https://covid-19.dataflowkit.com/v1/${s}`)
                .then((response) => {
                    console.log(response.data);
                    data.message = [check,response.data['Total Cases_text'], response.data['Total Deaths_text'], response.data['Total Recovered_text']]
                    console.log(data.message);
                    socket.emit('botreporting', data);
                    socket.to(data.roomname).emit("botreporting", data);
                })
        }
    })
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

