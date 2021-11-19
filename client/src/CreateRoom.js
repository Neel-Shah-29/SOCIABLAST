import React, { useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001")

function CreateRoom() {
    const [roomname, setRoomName] = useState("");
    const [roomcode, setRoomCode] = useState("");
    const [showChat, setShowChat] = useState(false);

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
                        <button onClick={create_Room}>Create A Room</button>
                    </div>
                ) : (
                    <Chat socket={socket} roomname={roomname} roomcode={roomcode} />
                )}
            </div>
        </>
    );
}

export default CreateRoom;