import SideBar from "./Sidebar";
import './SidebarCss.css';
import Chat from './Chat';
import JoinRoom from './JoinRoom';
import CreateRoom from "./CreateRoom";
import React from "react";
import { Link } from "react-router-dom";
function Main() {

    return (
        <div>
            <div className="grandfather">
                <div className="fathersync">
                    <div className="headers1">
                        <p>Username</p>
                    </div>
                    <SideBar />
                </div>
                <div className="mothersync">
                    <div className="headers2">
                        <p>Roomname</p>

                    </div>
                    <div><JoinRoom /></div>
                    <button><Link className="nav-link active" aria-current="page" to="/CreateRoom">Create a New room</Link></button>
                </div>
            </div>
        </div>
    );
}

export default Main;