import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import checkLogin from "./checkLogin";


function TweetInput () {
    const [ tweet , setTweet ] = useState("")

    const navigate = useNavigate()

    function sendData(e) {
        e.preventDefault()
        if ( tweet === "" ) return
        checkLogin().then( logged => {
            console.log("logged:",logged)
            if( !logged ) {
                console.log(28)
                return navigate("/login")
            }
            axios.post("http://localhost:5000/tweet",
            {
                content:tweet
            },
            {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":localStorage.getItem("accessToken")
                }
            })
            .then(response => {
                console.log( response)
            })
            .catch( err => {
                console.log(err)
            })
        })
    }



    return ( 
        <div>
            <form onSubmit={sendData}>
                <textarea value={tweet} onChange={(e)=>setTweet(e.target.value)}>

    
                </textarea>
                <button>tweet</button>
            </form>
            
        </div>
    )
}



export default TweetInput