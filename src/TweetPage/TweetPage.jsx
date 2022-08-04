import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
<<<<<<< HEAD
import Tweet from "../Tweet/Tweet";
=======
import Tweet from "./Tweet";
>>>>>>> 0400cc4df17903845d8275b9a832f8d3991fac87
import axios from "axios";
import Feed from "../Feed";
import getReplies from "./getReplies";
import getTweet from "./getTweet";
import ReplieInput from "./ReplieInput";


function TweetPage( props ) {
    const { tweetId } = useParams()
    const [ tweet , setTweet ] = useState(null)
    const [ replies , setReplies ] = useState([])
    function updateReplies() {
        //Update tweet to update stats
        getTweet(tweetId).then( tweet => setTweet(tweet))
        getReplies(tweetId).then( replies => setReplies(replies)) 

    }
    useEffect( () => {
        // GET THE TWEET
        getTweet(tweetId).then( tweet => setTweet(tweet))
<<<<<<< HEAD
        checkLogin().then( logged => {
            getReplies(tweetId).then(replies => setReplies(replies))
        })
=======
        //Get the replies
        getReplies(tweetId).then(replies => setReplies(replies))
>>>>>>> 0400cc4df17903845d8275b9a832f8d3991fac87
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