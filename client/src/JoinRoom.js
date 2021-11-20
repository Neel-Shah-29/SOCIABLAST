import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001")

const JoinRoom = () => {
    const [roomname, setRoomName] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [roomcode, setRoomCode] = useState("");
    const [roomstatus, setroomstatus] = useState("");
    const join_Room = () => {
        if (roomname !== "" && roomcode !== "") {
            socket.emit("roomlogincheck", { roomname, roomcode });
        }
    };

    useEffect(() => {
        socket.on("checkloginjoinroom", (data) => {
            console.log(data);
            setroomstatus(data)
            return (
                <>
                    <p>
                        {(data === "Invalid roomname" || data === "Invalid Password.") ? (
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
                            type="text"
                            placeholder="Room Passward"
                            onChange={(event) => {
                                setRoomCode(event.target.value);
                            }}
                        />
                        <button onClick={join_Room}>Join A Room</button>
                        <p>{roomstatus}</p>
                    </div>
                ) : (
                    <Chat socket={socket} roomname={roomname} roomcode={roomcode} />
                )}
            </div>
        </>
    );
}

export default JoinRoom;