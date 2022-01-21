import React, { useEffect, useState, useContext } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './index.css'
import UserContext from "./UserContext";
import Component from "./Component";

//import './Image.css'
const css = ` 
.my-element{
        color:white;
        height:100%;
        border-radius:25px;
        width:75px;
        background-color: #f5af09;
        // position:absolute;
        margin:auto;
        top:0;
        bottom:0;
        left:0;
        right: 0;
        font-size:20px;
        display:flex;
        justify-content: center;
        align-items: center;
        cursor:pointer;
}
input[type="file"]
{
    display:none;
}
.body{
    margin:0;
}`
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
        return ()=>{
            socket.off();
        }
    }, [socket]);
    File.prototype.convertToBase64 = function (callback) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
            callback(e.target.result, e.target.error);
        };
        reader.readAsDataURL(this);
    };
    const setImage = (event) => {
        console.log("hi")
        const selectedImage = event.target.files[0];

        selectedImage.convertToBase64(async (base64) => {
            const messageData = {
                roomname: roomname,
                username: username,
                image: base64,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),

            };
            console.log(base64);
            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        });


    }
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
                                id={username === messageContent.username ? "other" : (messageContent.username === "bot" ? "bot" : "you")}
                            >
                                {(messageContent.username === "bot") ? <Component a={messageContent} /> : <div>
                                    {(messageContent.image === undefined) ? <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div> : <div></div>}

                                    <div className="message-meta" style={{ display: "flex", flexDirection: "column" }}>
                                        {(messageContent.image !== undefined) ? <div classNmae="Image">
                                            <img style={{ maxWidth: "300px", maxHeight: "250px", borderRadius: "20px" }} src={messageContent.image} />
                                        </div> : <div></div>}
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <p id="time">{messageContent.time}</p>
                                            <p id="author">{messageContent.username}</p>
                                        </div>
                                    </div>
                                </div>}

                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "100%" }}>
                    <input style={{ width: "80%" }}
                        type="text"
                        value={currentMessage}
                        placeholder="Type Your Message..."
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <div class="body" style={{ width: "10%" }}>
                        <div class="my-element">
                            <style>{css}</style>
                            <input type="file" id="file" accept="image/*" onChange={setImage} />
                            <label for="file" style={{cursor:"pointer"}}>
                                &#x2912;
                            </label>
                        </div>
                    </div>
                    {/* <div className="my-element">
                    
                </div> */}
                    <button className="sendButton" style={{ width: "10%", height: "48px", backgroundColor: "#245f48", borderRadius: "50%" }}><button style={{ paddingTop: "2px", paddingLeft: "7px" }} onClick={sendMessage}>&#x27A2;
                    </button></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;