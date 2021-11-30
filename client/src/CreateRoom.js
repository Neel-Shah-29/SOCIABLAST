import './App.css';
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

const socket = io.connect("http://localhost:3001")

function CreateRoom() {
    const [roomname, setRoomName] = useState("");
    const [roomcode, setRoomCode] = useState("");
    const [showmain, setShowmain] = useState(false);
    const [createrName,setCreaterName]=useState("");
    const [status, setstatus] = useState("");
    const create_Room = () => {
        if (roomname !== "" && roomcode !== "") {
            socket.emit("createroom", { roomname, roomcode,createrName});
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
                    <h3>Join A Chat</h3>
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
                    <input
                        type="password"
                        placeholder="Creater Name"
                        onChange={(event) => {
                            setCreaterName(event.target.value);
                        }}
                    />
                    {!showmain && (<button className="button" onClick={create_Room}>Create Room</button>)}
                    {showmain && <button><Link className="nav-link active" aria-current="page" to="/Main" >Go To Main</Link></button>}
                    <p>{status}</p>
                </div>
            </div>
        </div>
    );

}

export default CreateRoom;