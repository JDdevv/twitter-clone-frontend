import React from "react";
import Tweet from "../Tweet/Tweet";

function Feed( props ) {
    return (
        <div>
            {props.tweets.map( tweet => <Tweet key={tweet._id} tweet={tweet} />)}
        </div>
    )
}

export default Feed