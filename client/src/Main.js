import SideBar from "./Sidebar";
import './SidebarCss.css';
import Chat from './Chat';
import JoinRoom from './JoinRoom';
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from "react";
import Login from "./login";
import context from "./login";
import io from "socket.io-client";
import UserContext from "./UserContext";
const socket = io.connect("http://localhost:3001");

function Main() {
    const { user, setuser } = useContext(UserContext);
    useEffect(() => {
        console.log(user);
    }, [user]);
    return (
        user ?
            (
                <div>
                    <div className="grandfather">
                        <div className="fathersync">
                            <div className="headers1">
                                <p>
                                    username
                                    <button><Link className="nav-link active" style={{ color: "white" }} aria-current="page" to="/CreateRoom">Create Room</Link></button>

                                </p>
                            </div>
                            <SideBar />
                        </div>
                        <div className="mothersync">
                            <div className="headers3">
                                <JoinRoom />
                            </div>
                            {/*<button className="butform">
                        <Link className="nav-link" to="/CreateRoom">Create A Room</Link>    
                    </button>*/}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Kindly login first</p>
                </div>
            )
    );
}

export default Main;