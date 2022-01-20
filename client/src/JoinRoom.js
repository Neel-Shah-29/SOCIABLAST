import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
import UserContext from './UserContext';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

const JoinRoom = () => {
    const {socket, user, setuser, deluxe, setDeluxe, joinJoined, setJoinJoined, remJoinChat, setRemJoinChat } = useContext(UserContext);
    const [roomname, setRoomName] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [roomcode, setRoomCode] = useState("");
    const [roomstatus, setroomstatus] = useState("");
    const [username, setusername] = useState("");
    const [joinStatus, setJoinStatus] = useState(false);
    const [sss, setsss] = useState(false);
    const join_Room = () => {
        if (roomname !== "" && roomcode !== "") {
            socket.emit("roomlogincheck", { deluxe, roomname, roomcode });
        }
    };

    useEffect(() => {
        socket.on("checkloginjoinroom", (data) => {
            setroomstatus(data)
            return (
                <>
                    <p>
                        {(data === "Invalid roomname" || data === "Invalid Password.") ? (
                            console.log(data)
                        ) : (setJoinStatus(true))}
                    </p>
                </>
            );
        })
        socket.on("RoomAlreadyJoined", (data) => {
            setsss(true);
        })
    }, [socket]);

    return (
        <div className="App">
            <div>
                <div className="joinChatContainer">
                    <h3>Join A Chat</h3>
                    <input
                        type="text"
                        placeholder="Roomname"
                        onChange={(event) => {
                            setRoomName(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Room Password"
                        onChange={(event) => {
                            setRoomCode(event.target.value);
                        }}
                    />
                    {!joinStatus && <button onClick={join_Room}>Join A Room</button>}
                    {joinStatus && <button><Link style={{ color: "white" }} className="nav-link active" aria-current="page" to="/Main" >Go To Main</Link></button>}
                    <p>{roomstatus}</p>
                    {sss && <p style={{ fontFamily: "Times New Roman" }}>Room Already Joined</p>}
                </div>
            </div>
        </div>
    );
}

export default JoinRoom;