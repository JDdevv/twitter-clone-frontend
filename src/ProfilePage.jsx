import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, } from "react-router-dom";
import Feed from "./Feed";
const userNotFound = {
    username : "User does not exists",
    description : "",
    followers : [],
    following : []
}
function ProfilePage() {
    const { userId } = useParams()
    const [ user , setUser ] = useState(null)
    const [ tweets , setTweets ] = useState([])
    const [ error , setError ] = useState(null)
    useEffect( () => {
        //GET THE USER
        console.log(userId)
        axios.get("http://localhost:4000/userinfo/"+userId)
        .then( response => {
            setUser(response.data)
        })
        .catch( err => {
            if ( err.response.status === 404 ) return setUser( userNotFound )
            if ( err.response.status === 500 ) return setError( "Internal server error")
            return setError("error")
        })
        //GET THE TWEETS
        axios.get("http://localhost:5000/tweets/user/"+userId)
        .then( response => {
            console.log(response)
            setTweets(response.data.tweets)
        })
        .catch( err => {
            if ( err.response ) setError( err.response.data )
        })
    },[userId])
    return ( 

        <div>
            {user &&
            <div className="user-data">
                <h2>{user.username}</h2>
                <p>{user.description}</p>
                <p>Followers {user.followers.length}</p>
                <p>Following {user.following.length}</p>
            </div>
            }
            <Feed tweets={tweets} />
            { error && <p>{error}</p>}
        </div>
    )
}

export default ProfilePage