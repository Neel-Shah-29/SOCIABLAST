import SideBar from "./Sidebar";
import './SidebarCss.css';
import Chat from './Chat';
<<<<<<< HEAD
import JoinRoom from './JoinRoom';
=======
import JoinRoom from './JoinRoom'; 
>>>>>>> 86839eabed21ec78774e02e4e0feeef1f7ab2ce9
import { Link } from 'react-router-dom'

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
<<<<<<< HEAD
                <div className="mothersync">
                    <div className="headers3">
                        <JoinRoom />
                    </div>
                    {/*<button className="butform">
                        <Link className="nav-link" to="/CreateRoom">Create A Room</Link>    
                    </button>*/}
=======
                <div className="mothersync">   
                    <div className="headers3">
                        <JoinRoom/>
                    </div>
                    {/*<button className="butform">
                        <Link className="nav-link" to="/CreateRoom">Create A Room</Link>    
                    </button>*/}        
>>>>>>> 86839eabed21ec78774e02e4e0feeef1f7ab2ce9
                </div>
            </div>
        </div>
    );
}

export default Main;