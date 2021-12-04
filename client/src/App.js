import './App.css';
import Login from './login';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Header from './Header';
import { Footer } from './Footer';
import Main from './Main';

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
  return (
    <BrowserRouter>
      <Header title="My Chat App" />
      <UserContext.Provider value={{ user, setuser, deluxe, setDeluxe, joinJoined, setJoinJoined, remJoinChat, setRemJoinChat }}>
        <Routes>
          {<Route exact path="/" element={<Home />} />}
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={< Login />} />
          <Route path="/Main" element={< Main />} />
          <Route path="/CreateRoom" element={<CreateRoom />} />
        </Routes>
      </UserContext.Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;