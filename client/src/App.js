import './App.css';
import Login from './login';
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
<<<<<<< HEAD


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
=======
    <div > 
      < Login />  
     
    </div>
>>>>>>> 59f9bec231150d5e9f4db77aed62484cab4ac6af
  );
}

export default App;
