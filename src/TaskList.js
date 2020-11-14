import React, { useEffect, useState, useContext } from "react";
import TaskCategory from './TaskCategory';
import TaskItem from './TaskItem';
import { DataStoreContext } from "./contexts";


export default function TaskList(){
	const { isLoggedIn, tasks, userId, categories, subtasks } = useContext(DataStoreContext);
	const [showCategory, setShowCategory] = useState(null);
	const [userCategories, setUserCategories] = useState([]);
	const [userTasks, setUserTasks] = useState([]);
	const [tasksAvailable, setTasksAvailable] = useState(true);

	useEffect(() => {
		document.title = "Tasks | Microplanner"
	}, [])

	useEffect(() => {
		function toggleCategory(id){
			if(showCategory === id){
				setShowCategory(null);
			}
			else{
				setShowCategory(id);
			}
		}

		setUserCategories([]);
		setUserTasks([]);
		const filteredCategories = categories.filter((category) => {
			return category.user_id === userId;
		})


		const filteredTasks = tasks.filter((task) => {
			return task.user_id === userId;
		})

		if(filteredTasks.length === 0){
			setTasksAvailable(false);
			return;
		}

		const taskToCategoryMap = new Map();
		var taskValue;
		for(taskValue of filteredTasks){
			if(taskToCategoryMap.get(taskValue.category_id)){
				taskToCategoryMap.set(taskValue.category_id, taskToCategoryMap.get(taskValue.category_id).concat([taskValue]));
			}
			else {
				taskToCategoryMap.set(taskValue.category_id, [taskValue]);
			}
		}

		var filteredTaskValue;
		const subtaskToTaskMap = new Map();
		for(filteredTaskValue of filteredTasks){
			subtaskToTaskMap.set(filteredTaskValue.id, []);
		}
		var subtaskValue;
		for(subtaskValue of subtasks){
			if(subtaskToTaskMap.get(subtaskValue.task_id)){
				subtaskToTaskMap.set(subtaskValue.task_id, subtaskToTaskMap.get(subtaskValue.task_id).concat([subtaskValue]))
			}
		}

		for(const[index, value] of filteredCategories.entries()){
			setUserCategories((userCategories) => [
				...userCategories,
				<TaskCategory
					key={index}
					name={value.category_name}
					count={taskToCategoryMap.get(value.id) ? taskToCategoryMap.get(value.id).length : 0}
					id={value.id}
					toggleCategory={toggleCategory}
				></TaskCategory>,
      		]);
		}


		for(const[index, value] of filteredTasks.entries()){
			setUserTasks((userTasks) => [
				...userTasks,
				((showCategory === value.category_id) && <TaskItem
					key={index}
					name={value.task_name}
					maxProgress={value.total}
					progress={value.progress}
					dueDate={value.deadline}
					subtasks={subtaskToTaskMap.get(value.id)}
				></TaskItem>),
      		]);
		}
	}, [categories, tasks, subtasks, showCategory, userId])

	if(!isLoggedIn){
		return (
			<div className="justify-content-center">
			  <div className="row centerTitle" id="achievementTitle">
				Sign in to see tasks!
			  </div>
			</div>
		)
	}
	else if(!tasksAvailable){
		return (
			<div className="justify-content-center">
			  <div className="row centerTitle" id="achievementTitle">
				Add some tasks!
			  </div>
			</div>
		)
	}

	return(
		<div>
			<div className="row topTitle" id="taskTitle">
				Tasks
			</div>
			<div className="row">
				<div className="col col-md-4 taskContainer">
					{userCategories}
				</div>
				<div className="col col-md-6 taskItem">
					{userTasks}
          		</div>
			</div>
		</div>
	)
}