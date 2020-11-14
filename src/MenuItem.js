import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from 'framer-motion';

export default function MenuItem({iconColor, icon, backgroundColor, linkTo, tag}){

	function showTag(){
		document.getElementById(`${tag}-tag`).style.display="block"
	}

	function hideTag(){
		document.getElementById(`${tag}-tag`).style.display="none"
	}

	return (
	<motion.div 
		className="menuItem"
		whileHover={{
			scale: 1.1,
		}}
	>
      <Link
        to={linkTo}
        onMouseOut={hideTag}
        onMouseOver={showTag}
        className={`w3-btn w3-round-large w3-${backgroundColor} menuButton`}
      >
        <FontAwesomeIcon icon={icon} color={iconColor} size="2x" />
      </Link>
      <span
        className="menuTag label label-default"
        style={{ display: "none" }}
        id={`${tag}-tag`}
      >
        {tag}
      </span>
    </motion.div>
  );
}