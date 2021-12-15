import './App.css';
import React, { useState, useEffect ,useContext} from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
import UserContext from './UserContext';
const socket = io.connect("http://localhost:3001")

const JoinRoom = () => {
    const { user, setuser,deluxe,setDeluxe,joinJoined,setJoinJoined,remJoinChat,setRemJoinChat} = useContext(UserContext);
    const [roomname, setRoomName] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [roomcode, setRoomCode] = useState("");
    const [roomstatus, setroomstatus] = useState("");
    const [username, setusername] = useState("");
    const [joinStatus,setJoinStatus]=useState(false);
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
                        ) : (setShowChat(true))}
                    </p>
                </>
            );
        })
        socket.on("RoomAlreadyJoined",(data)=>{
            setJoinStatus(true);
        })
    }, [socket]);

    return (
        <div className="App">
            {!showChat ? (
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
                    <button onClick={join_Room}>Join A Room</button>
                    <p>{roomstatus}</p>
                </div>
                    {joinStatus && <p style={{fontFamily:"Times New Roman" }}>Room Already Joined</p>}
                </div>
            ) : (
                <Chat socket={socket} roomname={roomname} username={username} />
            )}
        </div>
    );
}

export default JoinRoom;