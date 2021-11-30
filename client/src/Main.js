import SideBar from "./Sidebar";
import './SidebarCss.css';
import io from 'socket.io-client'
import JoinRoom from './JoinRoom';
import { Link } from 'react-router-dom'
import {useState,useEffect} from "react";

const socket=io.connect('http://localhost:3001');

function Main() {
    const [array,setArray]=useState([]);
    
    useEffect(()=>{
        console.log('Entered in the use effect of MAIN.')
        socket.on('takeAlreadyJoinedRooms',(data)=>{
            console.log(data);
            setArray(data);
            console.log('Data fetched successfully.');
        })
    },[]);

    return (
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
                </div>
            </div>
        </div>
    );
}

export default Main;