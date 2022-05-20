import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tweet from "./tweet";
import axios from "axios";
import Feed from "./Feed";

function TweetPage( props ) {
    const { tweetId } = useParams()
    const [ tweet , setTweet ] = useState(null)
    const [ replies , setReplies ] = useState([])
    const [ error , setError ] = useState(null)
    function getReplies(tweetId) {
        axios.get("http://localhost:5000/replies/"+tweetId)
        .then( response => {
            setReplies(response.data.replies)
        })
        .catch( err => {
            if ( err.response.status === 500 ) return console.log("Server is literally a coffe machine")
            if ( err.request ) return console.log("No response")
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
    },[tweetId])

    return ( 
        <div>
            { tweet && <Tweet tweet={tweet} />}
            { replies && <Feed tweets={replies} />}
            { error && <p>{error}</p>}
        </div>
    )
}

export default TweetPage