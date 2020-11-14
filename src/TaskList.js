import React, { useEffect, useState } from "react";
import TaskCategory from './TaskCategory';
import TaskItem from './TaskItem';

export default function TaskList(){
	const [showCategory, setShowCategory] = useState(null);

	function toggleCategory(id){
		if(showCategory === id){
			setShowCategory(null);
		}
		else{
			setShowCategory(id);
		}
	}

	useEffect(() => {
		document.title = "Tasks | Microplanner"
	  }, [])

	return(
		<div>
			<div className="row topTitle" id="taskTitle">
				Tasks
			</div>
			<div className="row">
				<div className="col col-md-4 taskContainer">
					<TaskCategory name="School" count="10" id="0" toggleCategory={toggleCategory}></TaskCategory>
					<TaskCategory name="Work" count="5" id="1" toggleCategory={toggleCategory}></TaskCategory>
					<TaskCategory name="Work" count="5" id="2" toggleCategory={toggleCategory}></TaskCategory>
				</div>
				<div className="col col-md-6 taskItem">
           			<TaskItem name="Homework" maxProgress="5" progress="1" dueDate="2020-12-10"></TaskItem>
					<TaskItem name="Essay" maxProgress="3" progress="2" dueDate="2020-12-12"></TaskItem>

          		</div>
			</div>
		</div>
	)
}