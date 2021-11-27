import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, roomname }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
<<<<<<< HEAD
=======
    // <div className="contact">
    //     Nel
    // </div>
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                roomname: roomname,
<<<<<<< HEAD
                username: username,
=======
                author: username,
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
<<<<<<< HEAD
=======

>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
<<<<<<< HEAD
                <p>{roomname}</p>
=======
                <p>Live Chat</p>
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div
                                className="message"
<<<<<<< HEAD
                                id={username === messageContent.username ? "you" : "other"}
=======
                                id={username === messageContent.author ? "you" : "other"}
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
<<<<<<< HEAD
                                        <p id="author">{messageContent.username}</p>
=======
                                        <p id="author">{messageContent.author}</p>
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
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
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;