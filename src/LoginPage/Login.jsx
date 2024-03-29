import React, { useState } from "react";
import checkLogin from "../GeneralUseFunctions/checkLogin";
import { useNavigate } from "react-router-dom";
import Button from "../Generic/Button"
import Section from "../Generic/Section"
import postData from "../GeneralUseFunctions/postData"


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
        postData("http://localhost:4000/login", {
            "username":username,
            "password":password
        },false).then( response => {
            if ( response ) {
            saveTokens(response)
            checkLogin().then( logged => {
                if( logged ) navigate("/")
            })

            }
        })
}

    return ( 
        <Section>
            <form onSubmit={sendData} action="POST">
                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
                <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
                <Button text="login"/>
            </form>
        </Section>

    )
}




export default Login