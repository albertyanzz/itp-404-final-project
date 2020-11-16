import React, { useEffect, useState, useContext } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubTasks from './SubTasks';
import ProgressBar from './ProgressBar';
import { DataStoreContext } from "./contexts";
import { fetchSubtasks } from './api';



export default function TaskItem({name, maxProgress, progress, dueDate, subtasks, id}){
	const { deleteSubtask, setDeleting } = useContext(DataStoreContext);
	const [showSubTask, setShowSubTask] = useState(false);
	const [taskSubtasks, setTaskSubtasks] = useState([]);
	const [progressBar, setProgressBar] = useState([]);
	const [currProgress, setCurrProgress] = useState(progress);

	function toggleSubTask(){
		setShowSubTask(!showSubTask);
	}

	useEffect(() => {
		fetchSubtasks().then((data) => {
			const thisSubtasks = data.filter((data) => {
				return data.task_id === id;
			})

			setCurrProgress(maxProgress-thisSubtasks.length);
		})
	}, [id, maxProgress])

	useEffect(() => {
		setTaskSubtasks([]);

		function removeSubtask(id, taskId){
			setDeleting(true);
			setCurrProgress(currProgress+1);
			deleteSubtask(id, taskId);
		}
		
		for(const[index, value] of subtasks.entries()){
			setTaskSubtasks((taskSubtasks) => [
				...taskSubtasks,
				// index={index} to remove warning
				<SubTasks key={value.id} index={index} name={value.subtask_name} id={value.id} taskId={value.task_id} removeSubtask={removeSubtask}></SubTasks>,
      		]);
		}

		setProgressBar([
			<ProgressBar key={name} totalValue={maxProgress} currValue={currProgress}>
				{
					element => {
					if (element)
						element.style.setProperty(
						"background-color",
						maxProgress === currProgress ? "#09de1b" : "#32a8a8" ,
						"important"
						);
					}
				}
			</ProgressBar>
		]);
	}, [subtasks, deleteSubtask, progress, maxProgress, name, currProgress, id, setDeleting]);


	return (
		<div className="taskBackdrop">
			<div className="taskBox">
				<div className="taskName">
					{name}
					<br></br>
					{`Due: ${dueDate}`}
				</div>
				<div className="progressBar">
					{progressBar}
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