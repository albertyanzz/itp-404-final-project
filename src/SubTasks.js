import React from "react";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SubTasks({name}){

	return (
    <div className="taskItemList">
		    <div>
            {name}
        </div>
        <div className="w3-button">
            <FontAwesomeIcon icon={faCheckSquare} color="black" size="2x" />
        </div>
    </div>
  );
}