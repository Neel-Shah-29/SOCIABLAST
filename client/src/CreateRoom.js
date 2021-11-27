<<<<<<< HEAD
import './App.css';
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
=======
import React, { useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
const socket = io.connect("http://localhost:3001")

function CreateRoom() {
    const [roomname, setRoomName] = useState("");
    const [roomcode, setRoomCode] = useState("");
    const [showChat, setShowChat] = useState(false);
<<<<<<< HEAD
    const [status, setstatus] = useState("");
    const create_Room = () => {
        if (roomname !== "" && roomcode !== "") {
            socket.emit("createroom", { roomname, roomcode });
        }
    };
    useEffect(() => {
        socket.on("checksameroom", (data) => {
            setstatus(data)
            console.log(data)
            return (
                <>
                    <p>
                        {(data === "Room already exists") ? (
                            console.log(data)
                        ) : (setShowChat(true))}
                    </p>
                </>
            );
        })
    }, [socket]);
    return (
        <div>
            <div className="Appcreate">
                {!showChat ? (
                    <div className="createroom">
                        <h3>Create a Room</h3>
=======

    const create_Room = () => {
        if (roomname !== "" && roomcode !== "") {
            socket.emit("createroom", { roomname, roomcode });
            setShowChat(true);
        }
    };
    return (
        <>
            <div className="App">
                {!showChat ? (
                    <div className="joinChatContainer">
                        <h3>Join A Chat</h3>
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
                        <input
                            type="text"
                            placeholder="Roomname"
                            onChange={(event) => {
                                setRoomName(event.target.value);
                            }}
                        />
                        <input
<<<<<<< HEAD
                            type="password"
                            placeholder="Room Password"
=======
                            type="text"
                            placeholder="Room Passward"
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
                            onChange={(event) => {
                                setRoomCode(event.target.value);
                            }}
                        />
<<<<<<< HEAD
                        <button onClick={create_Room} ><Link className="nav-link active" aria-current="page" to="/Main" style={{ color: "white" }}>Create A Room</Link></button>
                        <p>{status}</p>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
=======
                        <button onClick={create_Room}>Create A Room</button>
                    </div>
                ) : (
                    <Chat socket={socket} roomname={roomname} roomcode={roomcode} />
                )}
            </div>
        </>
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
    );
}

export default CreateRoom;