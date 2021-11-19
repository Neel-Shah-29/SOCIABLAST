import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001")

const JoinRoom = () => {
  const [roomname, setRoomName] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [roomcode, setRoomCode] = useState("");

  const join_Room = () => {
    if (roomname !== "" && roomcode !== "") {
      socket.emit("Joinroom", { roomname, roomcode });
      setShowChat(true);
    }
  };

  useEffect(() => {
    socket.on("recieve_roomlist", (data) => {
      console.log(data);
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
          </div>
        ) : (
          <Chat socket={socket} roomname={roomname} roomcode={roomcode} />
        )}
      </div>
    </>
  );
}

export default JoinRoom;