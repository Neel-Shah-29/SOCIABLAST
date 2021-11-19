import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001")

function CreateRoom() {
    const [roomname, setRoomName] = useState("");
    const [roomcode, setRoomCode] = useState("");
    const [showChat, setShowChat] = useState(false);
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
        <>
            <div className="App">
                {!showChat ? (
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
                            type="password"
                            placeholder="Room Passward"
                            onChange={(event) => {
                                setRoomCode(event.target.value);
                            }}
                        />
                        <button onClick={create_Room}>Create A Room</button>
                        <p>{status}</p>
                    </div>
                ) : (
                    <Chat socket={socket} roomname={roomname} roomcode={roomcode} />
                )}
            </div>
        </>
    );
}

export default CreateRoom;