import React, { useEffect, useState } from "react";
import axios from "axios";
import getData from "../GeneralUseFunctions/getData";
import { useNavigate, useParams, } from "react-router-dom";
import Feed from "../Generic/Feed";
import checkLogin from "../GeneralUseFunctions/checkLogin";
import Section from "../Generic/Section";
import Container from "../Generic/Container";
import ProfileData from "./ProfileData";
const userNotFound = {
    username : "User does not exists",
    description : "",
    followers : [],
    following : []
}
function ProfilePage() {
    const navigate = useNavigate()
    const { userId } = useParams()
    const [ user , setUser ] = useState(null)
    const [ tweets , setTweets ] = useState([])
    const [ error , setError ] = useState(null)
    //The sameUser field determines if the user being displayed is the same as the user logged.
    function updateData() {
        checkLogin().then( logged => {
            getData( "http://localhost:4000/userinfo/"+userId,true).then( user => {
                if (!user) return setUser(false)
                console.log(user)
                setUser(user)
            })
        })
    }
        
         
    useEffect( () => {
        //GET THE USER
        //Checking if the user is logged and updating its credentials so the servers gets the right infromation
        checkLogin().then( logged => {
            getData( "http://localhost:4000/userinfo/"+userId,true).then( user => {
                if (!user) return setUser(false)
                setUser(user)
            })
            //GET THE TWEETS
            getData("http://localhost:5000/tweets/user/"+userId,true).then( tweets => {
                setTweets(tweets)
            })

                
        })},[])
    return ( 
        <Section styles="profile-page-section">
            {user && <ProfileData handler={updateData} user={user} userId={userId}/>
            }
            {tweets && <Feed tweets={tweets} />}
            { error && <p>{error}</p>}
        </Section>
    )
}

export default ProfilePage