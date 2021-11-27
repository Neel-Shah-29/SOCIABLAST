import SideBar from "./Sidebar";
import './SidebarCss.css';
import Chat from './Chat';
import JoinRoom from './JoinRoom';
import { Link } from 'react-router-dom'

function Main() {
    return (
        <div>
            <div className="grandfather">
                <div className="fathersync">
                    <div className="headers1">
                        <p>
                            username
                            <button><Link className="nav-link active" aria-current="page" to="/CreateRoom">Create Room</Link></button>

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
    );
}

export default Main;