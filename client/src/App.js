import './App.css';
import Login from './login';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Header from './Header';
import { Footer } from './Footer';
import Main from './Main';
<<<<<<< HEAD
=======
import Help from './Help'

>>>>>>> 1a74e21e7a14151afe20bda72c060a3827ad8182
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import SignUp from './SignUp';
import Home from './Home';
import UserContext from './UserContext';
function App() {
  const [user, setuser] = useState(null);
<<<<<<< HEAD
  const [deluxe, setDeluxe] = useState({});
  const [joinJoined, setJoinJoined] = useState(null);
  const [remJoinChat, setRemJoinChat] = useState(true);
  const [messageList, setMessageList] = useState([]);
  return (
    <BrowserRouter>
      <Header title="My Chat App" />
      <UserContext.Provider value={{ user, setuser, deluxe, setDeluxe, joinJoined, setJoinJoined, remJoinChat, setRemJoinChat, messageList, setMessageList }}>
=======
  const [deluxe,setDeluxe]=useState({});
  const [joinJoined,setJoinJoined]=useState(null);
  const [remJoinChat,setRemJoinChat]=useState(true);
  const [messageList, setMessageList] = useState([]);
  const [color,setColor]=useState(0);
  return (
    <BrowserRouter>
      <Header title="Sociablast" />
      <UserContext.Provider value={{ user, setuser,deluxe,setDeluxe,joinJoined,setJoinJoined,remJoinChat,setRemJoinChat,messageList,setMessageList,color,setColor}}>
>>>>>>> 1a74e21e7a14151afe20bda72c060a3827ad8182
        <Routes>
          {<Route exact path="/" element={<Home />} />}
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={< Login />} />
          <Route path="/Main" element={< Main />} />
          <Route path="/CreateRoom" element={<CreateRoom />} />
          <Route path="/Help" element={<Help />} />
        </Routes>
      </UserContext.Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;