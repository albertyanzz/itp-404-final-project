import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuItem({iconColor, icon, backgroundColor, linkTo, tag}){

	function showTag(){
		document.getElementById(`${tag}-tag`).style.display="block"
	}

	function hideTag(){
		document.getElementById(`${tag}-tag`).style.display="none"
	}

	return(
		<div className="menuItem">
			<Link to={linkTo} onMouseOut={hideTag} onMouseOver={showTag} className={`w3-btn w3-round-large w3-${backgroundColor} menuButton`}>
				<FontAwesomeIcon
					icon={icon}
					color={iconColor}
					size="2x"
        		/>
			</Link> 
			<span className="menuTag label label-default" style={{display: "none"}} id={`${tag}-tag`}>{tag}</span>
		</div>
	)
}