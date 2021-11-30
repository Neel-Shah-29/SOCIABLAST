import './SidebarCss.css';
import {useState,useContext} from 'react';
import io from 'socket.io-client';
import UserContext from './UserContext';

const socket=io.connect('http://localhost:3001');

function SideBar(props){

    const { deluxe, setDeluxe} = useContext(UserContext);
    return(
        <div className="child1">
            {props.arr.map((currentelem) => {
                                return (
                                    <div className="async1">
                                        <p>
                                            {currentelem}
                                        </p>
                                    </div>
                                );
                            })}
        </div>
    );
}

export default SideBar;