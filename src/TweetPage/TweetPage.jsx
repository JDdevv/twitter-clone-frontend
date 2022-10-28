import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tweet from "../Tweet/Tweet";
import Feed from "../Feed"
import getData from "../getData";
import ReplieInput from "./ReplieInput";
import checkLogin from "../checkLogin";
//This is the page that shows a tweet and its replies
function TweetPage( props ) {
    const { tweetId } = useParams()
    const [ tweet , setTweet ] = useState(null)
    const [ replies , setReplies ] = useState([])
    //When a replie is made a request is made to the server to display the new replie and the updated tweet stats
    function updateReplies() {
        //Update tweet to update stats
        getData('http://localhost:5000/tweets/'+tweetId,true).then( tweet =>{ 
            setTweet(tweet)
        })
        getData('http://localhost:5000/replies/'+tweetId,true).then(replies => {
            setReplies(replies)
        })



    }
    //When the page is loaded requests are made to the server to get the tweet and its replies
    //For this we use the tweet id indicated in the url
    useEffect( () => {
        // First we try to logged the user so server can check if the user has interacted with the requested tweet
        checkLogin().then( logged => {
            //Then we request the tweet and its replies
            getData('http://localhost:5000/tweets/'+tweetId,true).then( tweet =>{ 
                setTweet(tweet)
            })
            getData('http://localhost:5000/replies/'+tweetId,true).then(replies => {
                setReplies(replies)
            })
        })
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