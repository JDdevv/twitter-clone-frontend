import React, { useState } from "react";
import axios from "axios";
import checkLogin from "./checkLogin";
import { useNavigate } from "react-router-dom";


function Login(props) {
    const [ username , setUsername ] = useState("")
    const [ password , setPassword ] = useState("")
    const navigate = useNavigate()
    function saveTokens(tokens) {
        localStorage.setItem("refreshToken",tokens.refreshToken)
        localStorage.setItem("accessToken",tokens.accessToken)
    }
    function sendData(e) {
        e.preventDefault()
        axios.post( "http://localhost:4000/login" , 
        {
            "username":username,
            "password":password
        })
        .then( response => {
            saveTokens(response.data)
            checkLogin().then( logged => {
                if( logged ) navigate("/")
            })
        })
        .catch( err => {
            console.log( err ) 
        },{
            headers:{"Content-Type":"application/json"}
        })
    }

    return ( 
        <div>
            <form onSubmit={sendData} action="POST">
                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
                <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button>Login</button>

            </form>
        </div>
    )
}




export default Login