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

    const formSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            Email:email,
            Password: password,
            Username: username
        }
        setAllEntry([...allEntry, newEntry]);
        socket.emit("loginSubmit", newEntry);
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
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
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
                <div>
                    <button onClick={opnSignUp}>New User? SignUp here!</button>
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
        </div>):(
            <div>
                <SignUp/>
            </div>
        )
    );

}

export default Login