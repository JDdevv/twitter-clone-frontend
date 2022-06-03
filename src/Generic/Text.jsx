import React from "react"


function Text( props ) {
	return (
		<p className={props.styles}>
			{ props.content || props.children }
		</p>
	)
}


export default Text
