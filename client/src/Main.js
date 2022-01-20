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


function Main() {
    const [array, setArray] = useState([]);
    const { socket,user, setuser, deluxe, setDeluxe, joinJoined, setJoinJoined, remJoinChat, setRemJoinChat } = useContext(UserContext);
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
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                    <div className="grandfather">
                        <div className="fathersync">
                            <div className="headers1">
                                <div style={{ color: "white", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                                    <b style={{ marginTop: "15px" }}>{deluxe.Username}</b>
                                    <div className="dropdown">
                                        <button className="dropbtn" style={{ fontSize: "40px", paddingTop: "0px", marginRight: "30px" }}>&#x21b4;</button>
                                        <div className="dropdown-content">
                                            <button style={{ width: "100%", margin: "0%" }}><Link className="nav-link active" style={{ color: "black", fontWeight: "bold" }} aria-current="page" to="/JoinRoom">Join Room</Link></button>
                                            <button style={{ width: "100%", margin: "0%" }}><Link className="nav-link active" style={{ color: "black", fontWeight: "bold" }} aria-current="page" to="/CreateRoom">Create Room</Link></button>
                                        </div>
                                    </div>
                                    {/*
                                    <button style={{ marginLeft: "30%" }}><Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/CreateRoom">Create Room</Link></button>
                                    */}
                                </div>
                            </div>
                            <SideBar arr={array} soc={socket} />
                        </div>
                        <div className="mothersync">
                            <div className="headers3">
                                {!remJoinChat && <Chat socket={socket} roomname={joinJoined} username={deluxe.Username} />}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="SSSSSS" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <img src={logo} style={{ width: "300px"}} />
                    <p className="Spara" style={{width:"500px"}}>Kindly login first</p>
                    <div>
                        <button className="button" style={{width:"500px"}}>
                            <Link className="nav-link active" aria-current="page" to="/Login" style={{ color: "black" }}
                            >Login</Link>
                        </button>
                    </div>
                </div>
            )
    );
}

export default Main;