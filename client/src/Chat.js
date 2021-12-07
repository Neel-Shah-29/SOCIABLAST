import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './index.css'
import { useContext } from "react";
import UserContext from "./UserContext";
function Chat({ socket, username, roomname }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const { messageList, setMessageList } = useContext(UserContext);
    const sendMessage = async () => {
        if (currentMessage.includes(".", 0)) {
            const messageData = {
                roomname: roomname,
                username: 'bot',
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            await socket.emit('botmessage', messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
        else if (currentMessage !== "") {
            const messageData = {
                roomname: roomname,
                username: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
        });
        socket.on("botreporting", (data) => {
            setMessageList((list) => [...list, data]);
            console.log(data);
        })
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>{roomname}</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.username ? "you" : (messageContent.username === "bot" ? "bot" : "other")}

                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.username}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>

            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button className="sendButton" style={{ width: "10px", backgroundColor: "#245f48", borderRadius: "50%" }}><button onClick={sendMessage}>&#9658;</button></button>
            </div>
        </div>
    );
}

export default Chat;