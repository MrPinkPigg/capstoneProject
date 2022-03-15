import React, {Component} from 'react';

const Login = () =>{
    return (
        <div class="mod">
            <div class="modal-content">
                <h2>Login</h2>
                <input class='inputs' placeholder='Username'></input> <br></br>
                <input class='inputs' placeholder='Password'></input> <br></br>
                <button type='submit'>Login</button>
            </div>
        </div>
    );
}

export default Login;