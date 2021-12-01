import io from "socket.io-client";
import {useEffect,useContext} from 'react';
import Chat from './Chat'
import UserContext from "./UserContext";
const socket=io.connect('http://localhost:3001');

function Container(props){
    let Roomname=props.Rname;
    const {joinJoined, setJoinJoined} = useContext(UserContext);

    function func(){
        socket.emit('JoinJoinedRooms',Roomname);
    }

    useEffect(() => {
        console.log('Frontend of the JoinJoinedRooms');
        socket.on("gotJoinJoinedRooms",(data) => {
            setJoinJoined(data);
        })
    }, [socket]);

    return (
        <div>
            <p>{Roomname}</p>
            <button className="button" onClick={func}>Open</button>
        </div>
    );
}

export default Container;