import React, { useEffect } from "react";
import TaskItem from './TaskItem';

export default function TaskList(){

	useEffect(() => {
		document.title = "Tasks | Microplanner"
	  }, [])

	return(
		<div>
			<div className="row topTitle" id="taskTitle">
				Tasks
			</div>
			<div className="taskContainer">
				<TaskItem></TaskItem>
			</div>
		</div>
	)
}