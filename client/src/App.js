import './App.css';
<<<<<<< HEAD
import Login from './login';
=======
import Login from './Login';
>>>>>>> b186b7e0763bc613c6c2c8a8e671c17c05f7bcd8
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
<<<<<<< HEAD
    <>
      <div> < Login />  </div>
      <div><CreateRoom /></div>
      <div><JoinRoom /></div>
    </>
=======
    <div> 
      <div>< Login /></div>
      <div><CreateRoom /></div>
      <div><JoinRoom /></div>  
    </div>
>>>>>>> b186b7e0763bc613c6c2c8a8e671c17c05f7bcd8
  );
}

export default App;