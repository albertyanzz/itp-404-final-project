import React, { useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubTasks from './SubTasks';
import ProgressBar from './ProgressBar';


export default function TaskItem({name, maxProgress, progress, dueDate}){

	const [showSubTask, setShowSubTask] = useState(false);

	function toggleSubTask(){
		setShowSubTask(!showSubTask);
	}

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
			{showSubTask && 
				<SubTasks></SubTasks>
			}
		</div>
	
  	);
}