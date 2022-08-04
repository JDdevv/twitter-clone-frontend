import React from "react"
import checkLogin from "../checkLogin"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import getReplies from "./getReplies"



function ReplieInput(props) {
    const { tweetId } = useParams()
    const [ replie , setReplie ] = useState("")
    const navigate = useNavigate()
    function sendReplie(e) {
        e.preventDefault()
        checkLogin().then( logged => {
            if ( !logged ) return navigate("/login")
            axios.post("http://localhost:5000/replies/"+tweetId,
            {
                content:replie
            },
            {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":localStorage.getItem("accessToken")
                }
            })
            .then(response => props.handler())
        
        })
    }
 
    return (
        <div>
            <form onSubmit={sendReplie}>
               <input type="text" value={replie} onChange={(e)=>{setReplie(e.target.value)}} placeholder="responde algo"/> 
               <button>send</button>
            </form>

        </div>
    )
}







export default ReplieInput