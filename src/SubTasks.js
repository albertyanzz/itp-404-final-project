import React from "react";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SubTasks(){

	return (
    <div className="taskItemList">
		<div>
            Paper 1
        </div>
        <div className="w3-button">
            <FontAwesomeIcon icon={faCheckSquare} color="black" size="2x" />
        </div>
    </div>
  );
}