import React from "react"
import checkLogin from "../GeneralUseFunctions/checkLogin"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import postData from "../GeneralUseFunctions/postData"



function ReplieInput(props) {
    const { tweetId } = useParams()
    const [ replie , setReplie ] = useState("")
    const navigate = useNavigate()
    function sendReplie(e) {
        e.preventDefault()
        checkLogin().then( logged => {
            if ( !logged ) return navigate("/login")
            postData("http://localhost:5000/replies/"+tweetId,replie,true).then(data => {
                console.log(data)
                props.handler()
            })
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