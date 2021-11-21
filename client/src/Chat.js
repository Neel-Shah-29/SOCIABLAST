import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
<<<<<<< HEAD

function Chat({ socket, username, roomname }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    // <div className="contact">
    //     Nel
    // </div>
=======
import io from 'socket.io-client';

const socket=io.connect('http://localhost:3001');

function Chat({username, roomname }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
>>>>>>> b186b7e0763bc613c6c2c8a8e671c17c05f7bcd8
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                roomname: roomname,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
<<<<<<< HEAD

=======
>>>>>>> b186b7e0763bc613c6c2c8a8e671c17c05f7bcd8
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
<<<<<<< HEAD
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);
=======
            console.log(data);
            setMessageList((list) => [...list, data]);
        });
    },[]);
>>>>>>> b186b7e0763bc613c6c2c8a8e671c17c05f7bcd8

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.author ? "you" : "other"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
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