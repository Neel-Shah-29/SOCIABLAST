import './App.css';
import React, { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import UserContext from './UserContext';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";


function CreateRoom() {
    const {socket, user, setuser, deluxe, setDeluxe, joinJoined, setJoinJoined, remJoinChat, setRemJoinChat } = useContext(UserContext);
    const [roomname, setRoomName] = useState("");
    const [roomcode, setRoomCode] = useState("");
    const [showmain, setShowmain] = useState(false);
    const [createrName, setCreaterName] = useState("");
    const [status, setstatus] = useState("");
    const create_Room = () => {
        if (roomname !== "" && roomcode !== "") {
            socket.emit("createroom", { roomname, roomcode, deluxe });
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
                        ) : (setShowmain(true))}
                    </p>
                </>
            );
        })
    }, [socket]);
    return (
        <div>
            <div className="App">
                <div className="joinChatContainers">
                    <h3>Create Room</h3>
                    <input
                        type="text"
                        placeholder="Roomname"
                        onChange={(event) => {
                            setRoomName(event.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Room Password"
                        onChange={(event) => {
                            setRoomCode(event.target.value);
                        }}
                    />
                    {!showmain && (<button className="button" onClick={create_Room}>Create Room</button>)}
                    {showmain && <button><Link style={{ color: "white" }} className="nav-link active" aria-current="page" to="/Main" >Go To Main</Link></button>}
                    <p>{status}</p>
                </div>
            </div>
        </div>
    );

}

export default CreateRoom;