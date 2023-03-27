import React, { useEffect, useState } from "react";
import checkLogin from "../GeneralUseFunctions/checkLogin";
import { useNavigate } from "react-router-dom";
import Container from "../Generic/Container";
import SmallHeading from "../Generic/SmallHeading"
import { Link } from "react-router-dom";
import Text from "../Generic/Text"
import Button from "../Generic/Button"
import getStats from "./getStats";
import getData from "../GeneralUseFunctions/getData"
import patchData from "../GeneralUseFunctions/patchData";
import StatsSection from "./TweetStatsSection";
function Tweet( props ) {
    const navigate = useNavigate()
    //Save the stats of the tweet
    return( 
        <Container>
            <SmallHeading styles="tweet-heading">
                <Link to={ "/profile/"+props.tweet.authorId } >{props.tweet.authorUsername}</Link>
            </SmallHeading>
            <Text content={props.tweet.content} styles="tweet-content" />
            <StatsSection liked={props.tweet.like} tweetId={props.tweet._id} stats={props.tweet.stats}/>
        </Container>
    )
}

export default Tweet
