import React from "react";
import Tweet from "./tweet";


function Feed( props ) {
    return ( 
        <div>
            { props.tweets.map( tweet => {
                return (<Tweet key={tweet._id} tweet={tweet} />)
            })
        }
        </div>
    )
}
export default Feed