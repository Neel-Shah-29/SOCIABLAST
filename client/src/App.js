import Login from './Login';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import './index.css'
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
  );
}

export default App;