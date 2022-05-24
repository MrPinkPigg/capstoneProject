import React, {Component, useState} from 'react';
import '../App.css';
import '../user.js';
import Axios from 'axios';


const Login = () =>{
    return (
        <div>
        <div class="mod" id='signIn'>
            <div class="modal-content">          
                    <h2>Sign In</h2>
                    <input class='inputs' placeholder='Username' id='username'></input> <br></br>
                    <input class='inputs' type='password' placeholder='Password' id='pass'></input> <br></br>
                    <button type='button' class='buttonLink' onClick={showForgot}>Forgot Password?</button> <br></br>
                    <button type='button' class='loginButton' onClick={loginUser}>Login</button>
                    <button type='button' class='buttonLink2' onClick={showCreate}>Create Account</button>           
            </div>
        </div>
        <div class="mod hide" id='createAcc'>
            <div class="modal-content">
                <h2 onClick={showLogin}>&#8592;</h2>
                <h2>Create Account</h2>
                <input class='inputs' placeholder='Username' id='newUsername'></input> <br></br>
                <input class='inputs' type='password' placeholder='Password' id='newPass'></input> <br></br>
                <button type='submit' class='loginButton' onClick={SignUp}>Create Account</button>
                <p class='hide' id='createMessage'>Account Created</p>
                <p class='hide' id='createErr'>Invalid email/password</p>
            </div>
        </div>
        <div class="mod hide" id='forgotPass'>
            <div class="modal-content"> 
                <h2>Reset Password</h2>
                <body>Enter your email to receive password instructions</body>
                <input class='inputs' placeholder='email' id='recovPassEmail'></input> <br></br>
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

const SignUp = () => {
        Axios.post("http://localhost:3001/register", {
            email:document.getElementById('newUsername').value, 
            password: document.getElementById('newPass').value}).then((response) => {
            console.log(response)
            if (response.data.err) {
                document.getElementById("createErr").classList.remove("hide")
            }
            else {
                document.getElementById("createMessage").classList.remove("hide")
            }
        })
}
function loginUser() {
    Axios.post("http://localhost:3001/login", {
            email:document.getElementById('username').value, 
            password: document.getElementById('pass').value}).then((response) => {
                if (response.data.auth) {
                    var url = window.location;
                    window.location.replace(url);
                    window.location = 'http://localhost:3000/plate';
                }
        })
        
}

export default Login;