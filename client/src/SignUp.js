import React, { useState, useEffect } from 'react'
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
<<<<<<< HEAD
    useEffect(() => {
        socket.on("signupsubmit", (data) => {
            setSubmitted(data)
            console.log(data)

        })
    }, [socket]);
    return (
        <div className="signUp">


=======
    
    return (
        <div className="signUp">
            
            
>>>>>>> 59f9bec231150d5e9f4db77aed62484cab4ac6af
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
<<<<<<< HEAD
                    <button className="Signupbutton" onClick={formSubmit} >Sign-Up!
                    </button>
                    <div>{submitted}</div>



                </form>
=======
                <button className="Signupbutton" onClick={formSubmit} >Sign-Up!   
                </button>
                <div>{submitted}</div>  
            </form>
            </div>
>>>>>>> 59f9bec231150d5e9f4db77aed62484cab4ac6af
            </div>
        </div>

    );

}

export default SignUp