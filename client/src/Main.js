import SideBar from "./Sidebar";
import './SidebarCss.css';
import Chat from './Chat';
import JoinRoom from './JoinRoom'; 

function Main(){
    return (
        <div>
            <div className="grandfather">
                <div className="fathersync">
                    <div className="headers1">
                        <p>Username</p>
                    </div>
                    <SideBar/>
                </div>
                <div className="mothersync">
                    <div className="headers2">
                        <p>Roomname</p>
                    </div>           
                </div>
            </div>
        </div>
    );
}

export default Main;