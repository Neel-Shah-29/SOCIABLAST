import io from "socket.io-client";
import { useEffect, useContext } from 'react';
import Chat from './Chat'
import UserContext from "./UserContext";

function Container(props) {
    let Roomname = props.Rname;
    const { joinJoined, setJoinJoined } = useContext(UserContext);
    const { remJoinChat, setRemJoinChat } = useContext(UserContext);
    const { messageList, setMessageList ,deluxe,socket} = useContext(UserContext);

    function func() {
        setMessageList([]);
        socket.emit('JoinJoinedRooms', {Roomname:Roomname,user:deluxe.Username});
    }

    useEffect(() => {
        console.log(joinJoined);
        console.log('Frontend of the JoinJoinedRooms');
        socket.on("gotJoinJoinedRooms", (data) => {
            setJoinJoined(data);
            setRemJoinChat(false);
        })
    }, [socket, joinJoined]);

    return (
        <div>
            <p>
                <button onClick={func} style={{ backgroundColor: "rgba(0,0,0,0)", marginLeft: "0", border: "none", padding: "10px", color: "white" }}>{Roomname}</button>
            </p>
        </div>
    );
}

export default Container;