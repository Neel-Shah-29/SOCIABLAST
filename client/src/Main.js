import SideBar from "./Sidebar";
import './SidebarCss.css';
import Chat from './Chat';
import JoinRoom from './JoinRoom'; 

function Main(){
    return (
        <div className="grandfather">
            <div className="fathersync">
                <SideBar/>
            </div>
            <div className="mothersync">
            </div>
        </div>
    );
}

export default Main;