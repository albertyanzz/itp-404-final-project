import React, { useEffect } from "react";
import TaskItem from './TaskItem';

export default function TaskList(){

	useEffect(() => {
		document.title = "Tasks | Microplanner"
	  }, [])

	return(
		<div className="taskContainer">
			<div className="row taskTitle" id="taskTitle">
				Tasks
			</div>
			<div className="row">
				<TaskItem></TaskItem>
			</div>
		</div>
	)
}