import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import checkLogin from "../GeneralUseFunctions/checkLogin";
import postData from "../GeneralUseFunctions/postData";


function TweetInput () {
    const [ tweet , setTweet ] = useState("")

    const navigate = useNavigate()

    function formAction(e) {
        e.preventDefault()
        if ( tweet === "" ) return
        checkLogin().then( logged => {
            if (!logged) return navigate("/login")
            postData("http://localhost:5000/tweet", tweet)
        })
    }



    return ( 
        <div>
            <form onSubmit={formAction}>
                <textarea value={tweet} onChange={(e)=>setTweet(e.target.value)}>
                </textarea>
                <button>tweet</button>
            </form>
            
        </div>
    )
}



export default TweetInput