import React, { useEffect, useState, useContext } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubTasks from './SubTasks';
import ProgressBar from './ProgressBar';
import { destroySubtask, saveTask, saveAchievement, fetchTask, destroyTask } from './api';
import { DataStoreContext } from "./contexts";



export default function TaskItem({name, maxProgress, progress, dueDate, subtasks}){
	const { tasks, setTasks, achievements, userId } = useContext(DataStoreContext);
	const [showSubTask, setShowSubTask] = useState(false);
	const [taskSubtasks, setTaskSubtasks] = useState([]);

	function toggleSubTask(){
		setShowSubTask(!showSubTask);
	}

	async function removeSubtask(id, taskId){
		destroySubtask(id);
		setTaskSubtasks(taskSubtasks.filter((subtask) => {
			return subtask.id !== id;
		}));

		const userAchievement = achievements.find((achievement) => {
			return achievement.user_id === userId;
		})

		saveAchievement({
			id: userAchievement.id,
			user_id: userId,
			tasks_completed: (userAchievement.tasks_completed+1),
		});

		const prevTask = await fetchTask(taskId);

		if(prevTask.progress+1 === prevTask.total){
			destroyTask(taskId);
			setTasks(tasks.filter((task) => {
				return task.id !== taskId;
			}))
		}
		else {
			saveTask({
				id: taskId,
				user_id: prevTask.user_id,
				task_name: prevTask.task_name,
				deadline: prevTask.deadline,
				progress: (prevTask.progress + 1),
				total: prevTask.total,
				category_id: prevTask.category_id,
			})
		}
	}

	useEffect(() => {
		setTaskSubtasks([]);
		for(const[index, value] of subtasks.entries()){
			setTaskSubtasks((taskSubtasks) => [
				...taskSubtasks,
				<SubTasks key={index} name={value.subtask_name} id={value.id} taskId={value.task_id} removeSubtask={removeSubtask}></SubTasks>,
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