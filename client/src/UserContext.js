import { createContext } from 'react';
import io from "socket.io-client"
//Creating the context object and passing the default values.
const UserContext = createContext(null);
export const socket=io.connect("");
export default UserContext;
