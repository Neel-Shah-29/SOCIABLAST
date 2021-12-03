import './SidebarCss.css';
import {useState,useContext} from 'react';
import io from 'socket.io-client';
import UserContext from './UserContext';
import Container from './Container.js'

function SideBar(props){

    const { deluxe, setDeluxe} = useContext(UserContext);
    return(
        <div className="child1">
            {props.arr.map((currentelem) => {
                return (
                    <div className="async1">
                        <Container Rname={currentelem} socket={props.soc}/>
                    </div>
                 );
            })}
        </div>
    );
}

export default SideBar;