import React from "react";
import Tweet from "./Tweet/Tweet";
import Container from "./Generic/Container"

function Feed( props ) {
    return ( 
        <Container styles="feed">
            { props.tweets.map( tweet => <Tweet key={tweet._id} tweet={tweet} />  ) } 
        </Container>
    )
}
export default Feed