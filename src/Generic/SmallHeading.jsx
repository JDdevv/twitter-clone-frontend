import React from "react"



function SmallHeading( props ) {
	return (
		<h3 className={props.styles}> { props.text || props.children } </h3>
	)
}


export default SmallHeading;
