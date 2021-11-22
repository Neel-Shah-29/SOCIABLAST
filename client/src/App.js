import Login from './Login';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
<<<<<<< HEAD
import './index.css'
=======
import Header from './Header';
import { Footer } from './Footer';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import SignUp from './SignUp';
import Home from './Home';
>>>>>>> 1766d4ac78b9e6a8cb6889dd96fd086b8e8db7c2
function App() {
  // const [roomname, setRoomName] = useState("");
  // const [showChat, setShowChat] = useState(false);
  // const [room_code, setRoom_Code] = useState("");

  // const joinRoom = () => {
  //   if (roomname !== "" && room_code !== "") {
  //     socket.emit("join_room", roomname);
  //     setShowChat(true);
  //   }
  // };
  return (
<<<<<<< HEAD
    <>
      <div> < Login />  </div>
      <div><CreateRoom /></div>
      <div><JoinRoom /></div>
    </>
=======


    <BrowserRouter>
      <Header title="My Chat App" />
      <Routes>
        {<Route exact path="/" element={<Home />} />}
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={< Login />} />
        <Route path="/CreateRoom" element={< CreateRoom />} />
        <Route path="/JoinRoom" element={< JoinRoom />} />

      </Routes>
      <Footer />
    </BrowserRouter>


    // <div> 
    //   <div>< Login /></div>
    //   <div><CreateRoom /></div>
    //   <div><JoinRoom /></div>  
    // </div>
>>>>>>> 1766d4ac78b9e6a8cb6889dd96fd086b8e8db7c2
  );
}

export default App;