import React from "react";
import TaskMenu from './TaskMenu';

export default function TaskItem(){

	return(
		<div className="taskRow">
			<div className="taskCount">
				<div className="circleTag">30</div>
			</div>
			<div className="taskCategory">
				School
			</div>
			<div>
				<TaskMenu></TaskMenu>
			</div>
		</div>
	)
}