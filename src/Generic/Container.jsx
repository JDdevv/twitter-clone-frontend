import React from "react";


function Container( props ) {
	return (
		<div className={ props.styles }>
			{ props.children }
		</div>
	)
}



export default Container
