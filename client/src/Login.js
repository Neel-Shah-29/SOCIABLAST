import React, { useState } from 'react'
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Login = () => {
    const [username, setUserame] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allEntry, setAllEntry] = useState([]);

    const formSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            email: email,
            password: password,
            username: username
        }
        setAllEntry([...allEntry, newEntry]);
        console.log(allEntry);
        socket.emit("signUpSubmit", newEntry);
    }
    return (
        <>
            <form action="" onSubmit={formSubmit}>
                <div>
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
                <div>
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
                <button>SignUp</button>
            </form>
            <div>
                {
                    allEntry.map((currentelem) => {
                        return (
                            <div>
                                <p>
                                    {currentelem.username} has signed up successfully!
                                </p>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );

}

export default Login