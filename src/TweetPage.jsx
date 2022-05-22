import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tweet from "./tweet";
import axios from "axios";
import Feed from "./Feed";
import getReplies from "./getReplies";
import checkLogin from "./checkLogin";


function TweetPage( props ) {
    const navigate = useNavigate()
    const { tweetId } = useParams()
    const [ tweet , setTweet ] = useState(null)
    const [ replies , setReplies ] = useState([])
    const [ error , setError ] = useState(null)
    const [ replie , setReplie ] = useState("")
    function sendReplie(e) {
        e.preventDefault()
        checkLogin().then( logged => {
            if ( !logged ) navigate("/login")
            else {
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
                .then(response => getReplies(tweetId).then(replies=>setReplies(replies)))
                .catch( err => console.log(err))
            }

        })
        
    }
    useEffect( () => {
        // GET THE TWEET
        axios.get("http://localhost:5000/tweets/"+tweetId)
        .then( response => {
            setTweet(response.data.tweet)
            getReplies(response.data.tweet._id)
        })
        .catch( err => {
            if ( err.response.status === 404 ) return setError("Tweet does not exist")
            if ( err.response.status === 500 ) return setError("Server is literally a coffe machine")
            if ( err.request ) return setError("No response")
            return setError("dev doesnt really now whats happening")
        })
        getReplies(tweetId).then(replies => setReplies(replies))
    },[tweetId])

    return ( 
        <div>
            { tweet && <Tweet tweet={tweet} />}
            <form onSubmit={sendReplie}>
               <input type="text" value={replie} onChange={(e)=>{setReplie(e.target.value)}} placeholder="responde algo"/> 
               <button>send</button>
            </form>
            { replies && <Feed tweets={replies} />}
            { error && <p>{error}</p>}
        </div>
    )
}

export default TweetPage