import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkLogin from "../GeneralUseFunctions/checkLogin";
import TweetInput from "./TweetInput";


function HomePage() {
    const navigate = useNavigate()
    //If the user is logged, it can access to the homepage, if not is redirected to the login page.
    useEffect( () => {
        checkLogin().then( logged => {
            if (!logged) navigate("/Login")
        })
    },[navigate])
    return (
        <div>
            <TweetInput/>
        </div>
    )
}


export default HomePage
