import SideBar from "./Sidebar";
import './SidebarCss.css';
import Chat from './Chat';
import JoinRoom from './JoinRoom';
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from "react";
import Login from "./login";
import io from "socket.io-client";
import UserContext from "./UserContext";
import logo from './warning.png';
const socket = io.connect("http://localhost:3001");


function Main() {
    const [array, setArray] = useState([]);
    const { user, setuser, deluxe, setDeluxe, joinJoined, setJoinJoined, remJoinChat, setRemJoinChat } = useContext(UserContext);
    useEffect(() => {
        console.log(deluxe);
        if (deluxe !== null) {
            socket.emit('getAlreadyJoinedRooms', deluxe)
            socket.on('takeAlreadyJoinedRooms', (data) => {
                setArray(data);
                console.log('Data fetched successfully.');
            })
        }
    }, [socket, joinJoined]);
    return (
        user ?
            (
                <div>
                    <div className="grandfather">
                        <div className="fathersync">
                            <div className="headers1">
                                <p style={{color:"white"}}>
                                    <b>{deluxe.Username}</b>
                                    <button style={{marginLeft:"30%"}}><Link className="nav-link active" style={{ color: "white"}} aria-current="page" to="/CreateRoom">Create Room</Link></button>

                                </p>
                            </div>
                            <SideBar arr={array} soc={socket} />
                        </div>
                        <div className="mothersync">
                            <div className="headers3">
                                {remJoinChat && <JoinRoom />}
                                {!remJoinChat && <Chat socket={socket} roomname={joinJoined} username={deluxe.Username} />}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="SSSSSS">
                    <img src={logo} style={{width:"300px",marginLeft:"0"}}/>
                    <p className="Spara">Kindly login first</p>
                    <div>
<<<<<<< HEAD
                        <button className="button">
                            <Link className="nav-link active" aria-current="page" to="/Login" style={{ color: "white" }}
=======
                    <button className="button">
                    <Link className="nav-link active" aria-current="page" to="/Login" style={{ color: "black" }}
>>>>>>> 1a74e21e7a14151afe20bda72c060a3827ad8182
                            >Login</Link>
                        </button>
                    </div>
                </div>
            )
    );
}

export default Main;