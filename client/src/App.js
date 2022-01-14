import './App.css';
import Login from './login';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Header from './Header';
import { Footer } from './Footer';
import Main from './Main';
import Help from './Help'

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
  const [deluxe, setDeluxe] = useState({});
  const [joinJoined, setJoinJoined] = useState(null);
  const [remJoinChat, setRemJoinChat] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const [color, setColor] = useState(0);
  return (
    <BrowserRouter>
      <Header title="Sociablast" />
      <UserContext.Provider value={{ user, setuser, deluxe, setDeluxe, joinJoined, setJoinJoined, remJoinChat, setRemJoinChat, messageList, setMessageList, color, setColor }}>
        <Routes>
          {<Route exact path="/" element={<Home />} />}
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={< Login />} />
          <Route path="/Main" element={< Main />} />
          <Route path="/CreateRoom" element={<CreateRoom />} />
          <Route path="/JoinRoom" element={<JoinRoom />} />
          <Route path="/Help" element={<Help />} />
        </Routes>
      </UserContext.Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;