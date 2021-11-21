import './App.css';
import Login from './Login';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
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

      </Routes>
      <Footer />
    </BrowserRouter>


    // <div> 
    //   <div>< Login /></div>
    //   <div><CreateRoom /></div>
    //   <div><JoinRoom /></div>  
    // </div>
  );
}

export default App;
