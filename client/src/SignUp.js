import React, { useState, useEffect,useContext } from 'react'
import io from "socket.io-client";
import UserContext from "./UserContext";

const SignUp = (props) => {
    const [username, setUserame] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allEntry, setAllEntry] = useState([]);
    const [submitted, setSubmitted] = useState("");
    const { socket } = useContext(UserContext);
    const formSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            email: email,
            password: password,
            username: username
        }
        socket.emit("signUpSubmit", newEntry);
    }
    useEffect(() => {
        socket.on("signupsubmit", (data) => {
            setSubmitted(data)
        })
    }, [socket]);
    return (
        <div className="signUp">
            <div className="signupimg">
                <h1>Sign-Up!</h1>
            </div>
            <hr />
            <div className="Signupdetails">Please enter your following details to SignUp:</div>
            <div className="form">
                <form action="" onSubmit={formSubmit}>
                    <div className="username">
                        <label htmlFor='username'>Username:</label>
                        <br />
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
                        <br />
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
                        <br />
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
                    <button className="Signupbutton" onClick={formSubmit} >Sign-Up!
                    </button>
                    <div>{submitted}</div>
                </form>
            </div>
        </div>

    );

}

export default SignUp