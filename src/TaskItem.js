import React, { useEffect, useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubTasks from './SubTasks';
import ProgressBar from './ProgressBar';


export default function TaskItem({name, maxProgress, progress, dueDate, subtasks}){

	const [showSubTask, setShowSubTask] = useState(false);
	const [taskSubtasks, setTaskSubtasks] = useState([]);

	function toggleSubTask(){
		setShowSubTask(!showSubTask);
	}

	useEffect(() => {
		setTaskSubtasks([]);
		for(const[index, value] of subtasks.entries()){
			setTaskSubtasks((taskSubtasks) => [
				...taskSubtasks,
				<SubTasks key={index} name={value.subtask_name}></SubTasks>,
      		]);
		}
	}, [subtasks]);

	return (
		<div className="taskBackdrop">
			<div className="taskName">
				<div>
					{name}
					<br></br>
					{`Due: ${dueDate}`}
				</div>
				<div className="progressBar">
					<ProgressBar totalValue={maxProgress} currValue={progress}>
						{
							element => {
							if (element)
								element.style.setProperty(
								"background-color",
								maxProgress === progress ? "#09de1b" : "#32a8a8" ,
								"important"
								);
							}
						}
					</ProgressBar>
            	</div>
				<div>
					<div className="w3-button w3-circle" onClick={toggleSubTask}>
						<FontAwesomeIcon icon={showSubTask ? faChevronUp : faChevronDown} color="black" size="2x" />
					</div>
				</div>

			</div>
			{showSubTask && taskSubtasks}
		</div>
	
  	);
}