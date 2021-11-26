import './App.css';
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
<<<<<<< HEAD

=======
        <Route path="/CreateRoom" element={< CreateRoom />} />
        <Route path="/JoinRoom" element={< JoinRoom />} />
        <Route path="/Main" element={< Main />} />
        <Route path="/CreateAndJoinRoom" element={<CreateAndJoinRoom/>}/>
>>>>>>> e6dbc16aeb3411793011d4082d8eacbee728f791
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;