import React, {Component} from 'react';
import '../App.css';

const Login = () =>{
    return (
        <div>
        <div class="mod" id='signIn'>
            <div class="modal-content">
                <h2>Sign In</h2>
                <input class='inputs' placeholder='Username'></input> <br></br>
                <input class='inputs' placeholder='Password'></input> <br></br>
                <button class='buttonLink' onClick={showForgot}>Forgot Password?</button> <br></br>
                <button type='submit' class='loginButton'>Login</button>
                <button class='buttonLink2' onClick={showCreate}>Create Account</button>
            </div>
        </div>
        <div class="mod hide" id='createAcc'>
            <div class="modal-content">
                <h2 onClick={showLogin}>&#8592;</h2>
                <h2>Create Account</h2>
                <input class='inputs' placeholder='Username'></input> <br></br>
                <input class='inputs' placeholder='Password'></input> <br></br>
                <button type='submit' class='loginButton' onClick={showCreate}>Create Account</button>
            </div>
        </div>
        <div class="mod hide" id='forgotPass'>
            <div class="modal-content"> 
                <h2>Reset Password</h2>
                <body>Enter your email to receive password instructions</body>
                <input class='inputs' placeholder='email'></input> <br></br>
                <button type='submit' class='loginButton' onClick={showForgot}>Send Email</button>
            </div>
        </div>
        </div>
    );
}

const showCreate = () => {
    const signinScreen = document.getElementById("signIn")
    const createaccScreen = document.getElementById("createAcc")
    const forgotScreen = document.getElementById("forgotPass")
    if (createaccScreen.classList.contains("hide")) {
        signinScreen.classList.add("hide")
        createaccScreen.classList.remove("hide")
    }
    else {
        signinScreen.classList.remove("hide")
        createaccScreen.classList.add("hide")
    }
}

const showForgot = () => {
    const signinScreen = document.getElementById("signIn")
    const createaccScreen = document.getElementById("createAcc")
    const forgotScreen = document.getElementById("forgotPass")
    if (forgotScreen.classList.contains("hide")) {
        forgotScreen.classList.remove("hide")
        signinScreen.classList.add("hide")
        createaccScreen.classList.add("hide")
    }
    else {
        forgotScreen.classList.add("hide")
        signinScreen.classList.remove("hide")
        createaccScreen.classList.add("hide")
    }
}

const showLogin = () => {
    const signinScreen = document.getElementById("signIn")
    const createaccScreen = document.getElementById("createAcc")
    const forgotScreen = document.getElementById("forgotPass")
    if (signinScreen.classList.contains("hide")) {
        signinScreen.classList.remove("hide")
        forgotScreen.classList.add("hide")
        createaccScreen.classList.add("hide")
    }
    else {
        signinScreen.classList.add("hide")
        forgotScreen.classList.remove("hide")
        createaccScreen.classList.add("hide")
    }
}

export default Login;