import React from "react";


function LargeHeading( props ) {
    return ( 
        <h2 className={props.styles}>
            {props.text || props.children}

        </h2>
    )
}



export default LargeHeading