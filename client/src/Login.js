import React, { useState } from 'react'
import SignUp from './SignUp';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Login = () => {
    
    const [username, setUserame] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail]=useState("");
    const [allEntry, setAllEntry] = useState([]);
    const [newUser,setNewUser]=useState(false);
    const [status,setStatus]=useState("");

    const formSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            Email:email,
            Password: password,
            Username: username
        }
        setAllEntry([...allEntry, newEntry]);
        socket.emit("loginSubmit", newEntry);
        socket.on('loginStatus',(data)=>{
            setStatus(data);
        })
    }

    function opnSignUp(){
        setNewUser(true);
    }
     
    return (
        !newUser ? (
        <div className="login">
            <h1 className="head">
                LOGIN
            </h1>
            <div className="loginimg">
                <img src=""></img>
            </div>
            <div className="logindetails">Please enter your following details to login:</div>
            <div className="form">
            <form action="" onSubmit={formSubmit}>
                <div className="username">
                    <label htmlFor='username'>Username:</label>
                    <input
                        className="user"
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Username'
                        autoComplete='name'
                        value={username}
                        onChange={(e) => setUserame(e.target.value)}
                        required
                    />
                </div>
                <div className="email">
                    <label htmlFor='email'>Email:</label>
                    <input
                        className="user"
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Email'
                        autoComplete='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="password">
                    <label htmlFor='password'>Password:</label>
                    <input
                        className="user"
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Password'
                        autoComplete='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="button" onClick={formSubmit}>Log-in</button>
                <div >
                    <button className="newUser" onClick={opnSignUp}>New User? SignUp here!</button>
                </div>
            </form>
            </div>
            
            <div>
                
                {
                    
                    
                    allEntry.map((currentelem) => {
                        // if(updtstatus===status){
                        return (
                            
                            <div>
                                <p>
                                     {username}{status}
                                </p>
                            </div>
                            
                        );
                        
                    })
                
                }
            </div>
        </div>):(
            <div>
                <SignUp/>
            </div>
        )
    );

}

export default Login