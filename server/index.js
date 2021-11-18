const express=require('express');
const app=express();
const cors=require('cors');
const http=require('http');
const { Server }=require('socket.io');
const mongoose=require('mongoose');
const Cryptr=require('cryptr');
require('dotenv').config();

app.use(cors);
const server=http.createServer(app);
const SignUpObject=require('./Modals/SignUpModal');


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

    socket.on('loginSubmit',(object)=>{
        SignUpObject.findOne({Username:object.username,Email:object.email})
        .then((data)=>{
            if(data===null){
                console.log('Invalid USERNAME or EMAIL.');
            }
            else{
                let savedPassword=cryptr.decrypt(data.Password);
                if(savedPassword===object.password){
                    console.log('Logged In Successfully.');
                }
                else{
                    console.log('Invalid Password.');
                }
            }
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