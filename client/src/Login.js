import React, { useState } from 'react'
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Login = () => {
    const [username, setUserame] = useState("");
    const [password, setPassword] = useState("");
    const [allEntry, setAllEntry] = useState([]);

    const formSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            
            password: password,
            username: username
        }
<<<<<<< HEAD
        setAllEntry([...allEntry, newEntry]);
        console.log(allEntry);
=======
        setAllEntry([...allEntry,newEntry]);
>>>>>>> fb6425faed3e27aa82187e5ac523ccc1e95ca3b2
        socket.emit("signUpSubmit", newEntry);
    }
    
    return (
        <div className="login">
            <h1 className="head">
                LOGIN
            </h1>
            <div className="form">
            <form action="" onSubmit={formSubmit}>
                <div className="username">
                    <label htmlFor='username'>Username:</label>
                    <input
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
                
              
                <div className="password">
                    <label htmlFor='password'>Password:</label>
                    <input
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
                <button className="button" >Log-in</button>
                
                <div>
                    <a href="SignUp.js" className="newUser">New User? SignUp here!</a>
                </div>
            </form>
            </div>
            <div>
                {
                    allEntry.map((currentelem) => {
                        return (
                            <div>
                                <p>
                                    {currentelem.username} has logged-in successfully!
                                </p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );

}

export default Login