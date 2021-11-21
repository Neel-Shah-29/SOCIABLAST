import React, { useState } from 'react'
import io from "socket.io-client";
// import ReCAPTCHA from "react-google-recaptcha";

const socket = io.connect("http://localhost:3001");

const SignUp = () => {
    const [username, setUserame] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allEntry, setAllEntry] = useState([]);
    const [submitted, setSubmitted] = useState("");

    const formSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            email: email,
            password: password,
            username: username
        }
        socket.emit("signUpSubmit", newEntry);
        setSubmitted("SignUp form submitted sucessfully");
        
        
        
    }
    // function onChange(value) {
    //     console.log("Captcha value:", value);
    //   }
    
    return (
        <div className="signUp">
            
            
            <div className="signupimg">
                <h1>Sign-Up!</h1>
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
                
                {/* <ReCAPTCHA
                    sitekey="Your client site key"
                    onChange={onChange}
                />, */}
                <button className="Signupbutton" onClick={formSubmit} >Sign-Up!   
                </button>
                <div>{submitted}</div>
                
                    
                
            </form>
            </div>
            </div>

    );

}

export default SignUp