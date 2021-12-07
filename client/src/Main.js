import SideBar from "./Sidebar";
import './SidebarCss.css';
import Chat from './Chat';
import JoinRoom from './JoinRoom';
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from "react";
import Login from "./login";
<<<<<<< HEAD
import context from "./login";
import io from "socket.io-client";
import UserContext from "./UserContext";
const socket = io.connect("http://localhost:3001");

function Main() {
    const { user, setuser } = useContext(UserContext);
    useEffect(() => {
        console.log(user);
    }, [user]);
=======
import io from "socket.io-client";
import UserContext from "./UserContext";
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
>>>>>>> af29855295fcee059fc727b8512291f34752f02f
    return (
        user ?
            (
                <div>
                    <div className="grandfather">
                        <div className="fathersync">
                            <div className="headers1">
                                <p>
<<<<<<< HEAD
                                    username
=======
                                    {deluxe.Username}
>>>>>>> af29855295fcee059fc727b8512291f34752f02f
                                    <button><Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/CreateRoom">Create Room</Link></button>

                                </p>
                            </div>
<<<<<<< HEAD
                            <SideBar />
                        </div>
                        <div className="mothersync">
                            <div className="headers3">
                                <JoinRoom />
                            </div>
                            {/*<button className="butform">
                        <Link className="nav-link" to="/CreateRoom">Create A Room</Link>    
                    </button>*/}
=======
                            <SideBar arr={array} soc={socket} />
                        </div>
                        <div className="mothersync">
                            <div className="headers3">
                                {remJoinChat && <JoinRoom />}
                                {!remJoinChat && <Chat socket={socket} roomname={joinJoined} username={deluxe.Username} />}
                            </div>
                            <div>
                            </div>
>>>>>>> af29855295fcee059fc727b8512291f34752f02f
                        </div>
                    </div>
                </div>
            ) : (
<<<<<<< HEAD
                <div>
                    <p>Kindly login first</p>
=======
                <div className="SSSSSS">
                    <p>Kindly login first</p>
                    <div>
                        <button className="button">
                            <Link className="nav-link active" aria-current="page" to="/Login" style={{ color: "white" }}
                            >Login</Link>
                        </button>
                    </div>
>>>>>>> af29855295fcee059fc727b8512291f34752f02f
                </div>
            )
    );
}

export default Main;