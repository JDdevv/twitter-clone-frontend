import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tweet from "../Tweet";
import axios from "axios";
import Feed from "../Feed";
import getReplies from "../getReplies";
import checkLogin from "../checkLogin";
import getTweet from "./getTweet";
import ReplieInput from "./ReplieInput";


function TweetPage( props ) {
    const { tweetId } = useParams()
    const [ tweet , setTweet ] = useState(null)
    const [ replies , setReplies ] = useState([])
    function updateReplies() {
        getTweet(tweetId).then( tweet => setTweet(tweet))
        getReplies(tweetId).then( replies => setReplies(replies)) 

    }
    useEffect( () => {
        // GET THE TWEET
        getTweet(tweetId).then( tweet => setTweet(tweet))
        getReplies(tweetId).then(replies => setReplies(replies))
    },[tweetId])

    return ( 
        <div>
            
            { tweet && 
            <>
                <Tweet tweet={tweet} />
                <ReplieInput handler={updateReplies}/>
            </>
            }

            { replies && <Feed tweets={replies} />}
            {!tweet && <p>This tweet does not exist</p>}
        </div>
    )
}

export default TweetPage