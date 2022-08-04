import React, { useState } from "react";
import axios from "axios";
import checkLogin from "../checkLogin";
import { useNavigate } from "react-router-dom";
import Container from "../Generic/Container";
import SmallHeading from "../Generic/SmallHeading"
import { Link } from "react-router-dom";
import Text from "../Generic/Text"
import Button from "../Generic/Button"
import getStats from "./getStats";
function Tweet( props ) {
    const navigate = useNavigate()
    //Keeps track of the tweet being liked or unliked, so the button can display the right message
    const [ liked , setLiked ] = useState( props.tweet.like ) 
    //Save the stats of the tweet
    const [ stats , setStats ] = useState( props.tweet.stats)
    console.log(props.tweet[0], "likes")
    function like() {
        checkLogin().then( logged => {
            if ( !logged )  navigate("/login")
            else {
                //When the like button is clicked a resquest is made to the tweets server to proccess the like/unlike
                axios.patch("http://localhost:5000/tweets/likes/"+props.tweet._id,{},{
                    headers :{
                        "Authorization":localStorage.getItem("accessToken")
                    }
                }).then( response => {
                    //Then once the request has been made the data is updated
                    if ( response.status === 200 ) setLiked( prevState => !prevState ) 
                    getStats(props.tweet._id).then( stats => setStats(stats))
                })
            }
           
        })        
    }
    function reTweet() {
        checkLogin().then( logged => {
            if ( !logged ) return navigate("/login")

            //When the like button is clicked a resquest is made to the tweets server to proccess the retweet
            axios.patch("http://localhost:5000/retweets/"+props.tweet._id,{},{
                headers :{
                    "Authorization":localStorage.getItem("accessToken")
                }
            }).then( response => {

                if ( response.status === 200 ) getStats(props.tweet._id).then( stats => setStats(stats))
            })
        })
    }
    return( 
        <Container>
            <SmallHeading styles="tweet-heading">
                <Link to={ "/profile/"+props.tweet.authorId } >{props.tweet.authorUsername}</Link>
            </SmallHeading>
            <Text content={props.tweet.content} styles="tweet-content" />
            <p>replies:{stats.replies.length}</p>
            <p>likes:{stats.likes.length}</p>
            <p>retweets:{stats.reTweets.length}</p>
            <button onClick={like}>
                { liked ? "unlike" : "like" }
            </button>
            <button onClick={reTweet}>reTweet</button>

        </Container>
    )
}

export default Tweet