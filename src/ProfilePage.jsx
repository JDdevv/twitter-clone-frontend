import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, } from "react-router-dom";
import Feed from "./Feed";
import checkLogin from "./checkLogin";
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
    //This is important to know because the gui changes basing on that fact
    const [ sameUser , setSameUser ] = useState(false)
    //Determines if the logged user is following the user being displayed.
    const [ isFollowing , setIsFollowing ] = useState( null)
    function follow() {
        checkLogin().then( logged => {
            if ( !logged ) return navigate("/login")
            axios.patch("http://localhost:4000/users/follow/"+userId,{},{
                headers :{
                    "Authorization":localStorage.getItem("accessToken")
                }
            }).then( response => {
                if ( response.status === 200 ) {
                    setIsFollowing( prevState => !prevState)
                }
            })
        })


    }
    useEffect( () => {
        //GET THE USER
        //Checking if the user is logged and updating its credentials so the servers gets the right infromation
        checkLogin().then( logged => {
                axios.get("http://localhost:4000/userinfo/"+userId,{
                    headers : {
                        "Authorization": localStorage.getItem("accessToken")
                    }
                })
                .then( response => {
                    console.log(response)
                    setUser(response.data.user)
                    setSameUser(response.data.user.sameUser)
                    setIsFollowing(response.data.user.isFollowing)
                })
                .catch( err => {
                    if ( err.response.status === 404 ) return setUser( userNotFound )
                    if ( err.response.status === 500 ) return setError( "Internal server error")
                    return setError("error")
                })
                //GET THE TWEETS
                axios.get("http://localhost:5000/tweets/user/"+userId,{
                    headers:{
                        "Authorization":localStorage.getItem("accessToken")
                    }
                })
                .then( response => {
                    console.log(response)
                    setTweets(response.data.tweets)
                })
                .catch( err => {
                    if ( err.response ) setError( err.response.data )
                })

        })
            },[userId])
    return ( 

        <div>
            {user &&
            <div className="user-data">
                <h2>{user.username}</h2>
                <p>{user.description}</p>
                { !sameUser && <button onClick={follow}>
                    {isFollowing ? "dejar de seguir" : "Seguir"}
                </button>}
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