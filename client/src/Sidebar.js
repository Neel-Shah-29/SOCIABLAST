import './SidebarCss.css';
import {useState} from 'react';
import io from 'socket.io-client';

const socket=io.connect('http://localhost:3001');

function SideBar(){

    const [array,setArray]=useState([]);
    function getData(){
        socket.emit('getAlreadyJoinedRooms',{Username:"ZHOLAR"});
        socket.on('takeAlreadyJoinedRooms',(data)=>{
            setArray(data);
            console.log(array);
        })
    }

    return(
        <div className="child1">
            <div className="async1">
                <p>ROOM1</p>
            </div>
            <div className="async1">
                <p>ROOM2</p>
            </div>
            <div className="async1">
                <p>ROOM3</p>
            </div>
            <div className="async1">
                <p>ROOM4</p>
            </div>
            <div className="async1">
                <p>ROOM5</p>
            </div>
            <div className="async1">
                <p>ROOM6</p>
            </div>
            <div className="async1">
                <p>ROOM7</p>
            </div>
        </div>
    );
}

export default SideBar;