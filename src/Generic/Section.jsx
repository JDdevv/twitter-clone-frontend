import React from "react";


function Section(props) {
    return (
        <section className={props.styles}>
            {props.children}


        </section>
    )
}



export default Section