import React, { useState } from "react";
import axios from "axios";
import checkLogin from "../checkLogin";
import { useNavigate } from "react-router-dom";
import Container from "../Generic/Container";
import SmallHeading from "../Generic/SmallHeading"
import { Link } from "react-router-dom";
import Text from "../Generic/Text"
import { useEffect } from "react";
function Tweet( props ) {
    const navigate = useNavigate()
    const [ liked , setLiked ] = useState( props.tweet.like ) 
    useEffect( () => {
        setLiked((props.tweets.like))
    },[props.tweet.like])
    function like() {
        checkLogin().then( logged => {
            if ( !logged ) return navigate("/login")
            axios.patch("http://localhost:5000/tweets/likes/"+props.tweet._id,{},{
                headers :{
                    "Authorization":localStorage.getItem("accessToken")
                }
            })
           
        })        
    }
    function reTweet() {
        checkLogin().then( logged => {
            if ( !logged ) return navigate("/login")
            axios.patch("http://localhost:5000/retweets/"+props.tweet._id,{},{
                headers :{
                    "Authorization":localStorage.getItem("accessToken")
                }
            })
        })        
    }
    return( 
        <Container>
            <SmallHeading styles="tweet-heading">
                <Link to={ "/profile/"+props.tweet.authorId } >{props.tweet.authorUsername}</Link>
            </SmallHeading>
            <Text content={props.tweet.content} styles="tweet-content" />
            <p>replies:{props.tweet.replies.length}</p>
            <p>likes:{props.tweet.likes.length}</p>
            <p>retweets:{props.tweet.reTweets.length}</p>
            <button onClick={like}>
                { liked ? "unlike" : "like" }
            </button>
            <button onClick={reTweet}>reTweet</button>

        </Container>
    )
}

export default Tweet