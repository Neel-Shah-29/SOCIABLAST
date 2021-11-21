import React, { useState } from 'react'
import io from "socket.io-client";
// import ReCAPTCHA from "react-google-recaptcha";

const socket = io.connect("http://localhost:3001");

const SignUp = () => {
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
        socket.emit("signUpSubmit", newEntry);
    }
    function onChange(value) {
        console.log("Captcha value:", value);
      }
    
    return (
        <div className="signUp">
            
            <div className="signupimg">
                <img src="https://monophy.com/media/MCdu3khUPl7txXxOha/monophy.gif"></img>
            </div>
            <div className="Signupdetails">Please enter your following details to SignUp:</div>
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
                <button className="button" onClick={formSubmit}>Sign-Up!</button>
            </form>
            </div>
            </div>

    );

}

export default SignUp