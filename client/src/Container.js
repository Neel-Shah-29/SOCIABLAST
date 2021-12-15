import io from "socket.io-client";
import { useEffect, useContext } from 'react';
import Chat from './Chat'
import UserContext from "./UserContext";

<<<<<<< HEAD
function Container(props) {
    let Roomname = props.Rname;
    const { joinJoined, setJoinJoined } = useContext(UserContext);
    const { remJoinChat, setRemJoinChat } = useContext(UserContext);
    const { messageList, setMessageList } = useContext(UserContext);
    function func() {
        props.socket.emit('JoinJoinedRooms', Roomname);
        setMessageList([])
=======
function Container(props){
    let Roomname=props.Rname;
    const {joinJoined, setJoinJoined} = useContext(UserContext);
    const {remJoinChat,setRemJoinChat}=useContext(UserContext);
    const {messageList, setMessageList} = useContext(UserContext);

    function func(){
        setMessageList([]);
        props.socket.emit('JoinJoinedRooms',Roomname);
>>>>>>> 1a74e21e7a14151afe20bda72c060a3827ad8182
    }

    useEffect(() => {
        console.log(joinJoined);
        console.log('Frontend of the JoinJoinedRooms');
        props.socket.on("gotJoinJoinedRooms", (data) => {
            setJoinJoined(data);
            setRemJoinChat(false);
        })
    }, [props.socket, joinJoined]);

    return (
        <div>
            <p>
            <button onClick={func} style={{backgroundColor:"rgba(0,0,0,0)",marginLeft:"0",border:"none",padding:"10px",color:"white"}}>{Roomname}</button>
            </p>
        </div>
    );
}

export default Container;