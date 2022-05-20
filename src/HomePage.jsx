import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkLogin from "./checkLogin";
import TweetInput from "./TweetInput";


function HomePage() {
    const navigate = useNavigate()
    useEffect( () => {
        checkLogin().then( logged => {
            
            if (!logged) {
                navigate("/Login")
            } else {
                console.log(21)
            }
        })
    },[navigate])
    return (
        <div>
            <TweetInput/>
        </div>
    )
}


export default HomePage
