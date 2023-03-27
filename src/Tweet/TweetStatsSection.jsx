import React, { useEffect, useState } from "react";
import  Container  from "../Generic/Container"
import checkLogin from "../GeneralUseFunctions/checkLogin";
import getData from "../GeneralUseFunctions/getData";
import patchData from "../GeneralUseFunctions/patchData";
import { useNavigate } from "react-router-dom";
import StatButton from "./StatButton";


function StatsSection(props) {
    const navigate = useNavigate()
    //Keeps track of the tweet being liked or unliked, so the button can display the right message
    const [ liked , setLiked ] = useState( props.liked ) 
    const [stats, setStats ] = useState(props.stats)
    useEffect( () => {
        setStats(props.stats)
    },[props.stats])
    function like() {
        checkLogin().then( logged => {
            if ( !logged ) return navigate("/login")
            //When the like button is clicked a resquest is made to the tweets server to proccess the like/unlike
            patchData("http://localhost:5000/tweets/likes/"+props.tweetId,{},true).then( response => {
                //Then once the request has been made the data is updated
                if ( response.status === 200 ) setLiked( prevState => !prevState ) 
                getData("http://localhost:5000/stats/"+props.tweetId).then( data => setStats(data))
            })
        })        
    }
    function reTweet() {
        checkLogin().then( logged => {
            if ( !logged ) return navigate("/login")
            //When the like button is clicked a resquest is made to the tweets server to proccess the retweet
            patchData( "http://localhost:5000/retweets/"+props.tweetId,{},true).then( response => {
                if ( response.status === 200 ) {
                    getData("http://localhost:5000/stats/"+props.tweetId).then( stats => setStats(stats))
                }
            })
        })
    }
    function replie() {
        console.log("programmer lazy, feature not implemented yet ,sorry , have a good day")
    }

    return (
        <Container>
            <StatButton stat={"likes"} handler={like}  statCount={stats.likes.length}>
                {liked ? "unlike" : "like"}
            </StatButton>
            <StatButton stat={"reTweets"} handler={reTweet} statCount={stats.reTweets.length}>
                reTweet
            </StatButton>
            <StatButton stat={"replies"} handler={replie} statCount={stats.replies.length}>replie</StatButton>


        </Container>
    )

        

}


export default StatsSection