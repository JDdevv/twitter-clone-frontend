import React from "react";


function Tweet( props ) {
    return( 
        <div>
            <h3>{props.tweet.authorUsername}</h3>
            <p>{props.tweet.content}</p>
        </div>
    )
}

export default Tweet