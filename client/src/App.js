import './App.css';
<<<<<<< HEAD
import Login from './login';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Header from './Header';
import { Footer } from './Footer';
import Main from './Main';
import CreateAndJoinRoom from './CreateAndJoinRoom';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import SignUp from './SignUp';
import Home from './Home';
function App() {
  return (
    <BrowserRouter>
      <Header title="My Chat App" />
      <Routes>
        {<Route exact path="/" element={<Home />} />}
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={< Login />} />
        <Route path="/CreateRoom" element={< CreateRoom />} />
        <Route path="/JoinRoom" element={< JoinRoom />} />
        <Route path="/Main" element={< Main />} />
        <Route path="/CreateAndJoinRoom" element={<CreateAndJoinRoom/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
=======
import Login from './Login';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
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
    <>
      <div> < Login />  </div>
      <div><CreateRoom /></div>
      <div><JoinRoom /></div>
    </>
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
  );
}

export default App;
