import React, { useEffect, useState, useContext } from "react";
import AddCategoryModal from './AddCategoryModal';
import { DataStoreContext } from "./contexts";
import { saveTask, saveSubtask, saveCategory, fetchCategories, fetchTasks, fetchSubtasks } from './api';
import { useHistory } from "react-router-dom";


export default function AddTask(){

	const [name, setName] = useState("");
	const history = useHistory();
	const [selectedCategory, setSelectedCategory] = useState("DEFAULT");
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [deadline, setDeadline] = useState("");
	const [subtask, setSubtask] = useState("");
	const [newSubtasks, setNewSubtasks] = useState([]);
	const [selectedSubtask, setSelectedSubtask] = useState("");
	const { isLoggedIn, categories, setCategories, userId, setSubtasks, setTasks } = useContext(DataStoreContext);

	function hideCategoryModal(){
		setCategoryModalOpen(false);
	}

	async function handleSubmit(event) {
		event.preventDefault();

		const newTask = {
			user_id: userId,
			task_name: name,
			deadline: deadline,
			progress: 0,
			total: newSubtasks.length,
			category_id: selectedCategory,
		}

		const newTaskId = await saveTask(newTask).then((data) => {
			return data.id;
		});
		
		var a_subtask;
		for(a_subtask of newSubtasks){
			const newSubtask = {
				task_id: newTaskId,
				subtask_name: a_subtask.name,
			};

			saveSubtask(newSubtask);
		}

		fetchTasks().then((data) => {
			setTasks(data);
		});

		fetchSubtasks().then((data) => {
			setSubtasks(data);
		})

		setName("");
		setSelectedCategory(0);
		setDeadline("");
		setSubtask("");
		setNewSubtasks([]);
		history.push("/tasks");
	}

	function handleNameChange(event) {
		setName(event.target.value);
	}

	function handleCategoryChange(event) {
		if(event.target.value === "add"){
			setCategoryModalOpen(true);
		}
		else {
			const categoryId = Number(event.target.value);
			setSelectedCategory(categoryId);
		}
	}

	function handleDeadlineChange(event) {
		setDeadline(event.target.value);
	}

	function handleSubtaskChange(event) {
		setSubtask(event.target.value);
	}

	function handleSelectedSubtaskChange(event) {
		const subtaskId = Number(event.target.value);
		setSelectedSubtask(subtaskId);
	}

	function addNewCategory(newCategory) {
		const cat = {
			category_name: newCategory,
			user_id: userId,
		}

		const searchCategory = categories.find((category) => {
			return category.category_name === newCategory;
		})
		if(searchCategory){
			setSelectedCategory(searchCategory.id);
			setCategoryModalOpen(false);
			return; // No need to add existing category
		}

		saveCategory(cat).then(() => {
			return fetchCategories();
		}).then((data) => {
			setCategories(data);
		});
		setSelectedCategory(categories.length+1);
		setCategoryModalOpen(false);
	}

	function addSubtask(){
		const task = {
			name: subtask,
			id: newSubtasks.length,
		}
		setNewSubtasks(newSubtasks.concat([task]));
		setSubtask("");
	}

	function removeSubtask(event){
		event.preventDefault();

		setNewSubtasks(newSubtasks.filter((subtask) => {
			return subtask.id !== selectedSubtask;
		}))
	}

	function fieldsFilled() {
		if(name === "" || selectedCategory === "DEFAULT" || deadline === ""){
			return false;
		}
		else return true;
	}

	useEffect(() => {
		document.title = "Add Tasks | Microplanner"
	}, []);

	if(!isLoggedIn){
		return (
			<div className="justify-content-center">
			  <div className="row centerTitle" id="achievementTitle">
				Sign in to add a task!
			  </div>
			</div>
		)
	}

	return(
		<div style={{marginTop: "10%"}}>
			{categoryModalOpen && <AddCategoryModal onClose={hideCategoryModal} saveCategory={addNewCategory}></AddCategoryModal>}
			<form onSubmit={handleSubmit}>
				<div className="row justify-content-around">
					<div className="form-group col-md-6">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							value={name}
							onChange={handleNameChange}
							className="form-control"
							id="name"
						/>
					</div>
					<div className="form-group col-sm-3">
						<label htmlFor="category">Category</label>
						<select
							className="form-control"
							id="category"
							value={selectedCategory}
							onChange={handleCategoryChange}
						>
							<option value="DEFAULT" disabled>Choose a category</option>
							{categories.map((category) => {
								return (
									<option key={category.id} value={category.id}>
										{category.category_name}
									</option>
								)
							})}
							<option value="add">Add a category...</option>
						</select>
					</div>
				</div>
				<div className="row justify-content-center align-items-end">
					<div className="form-group col-md-3">
						<label htmlFor="subtask">Subtasks</label>
						<input
							type="text"
							id="subtask"
							className="form-control"
							placeholder="Add a subtask"
							value={subtask}
							onChange={handleSubtaskChange}
						/>
					</div>
					<div className="form-group col-sm-1">
						<button className="btn btn-primary" onClick={addSubtask} disabled={subtask === ""}>Add</button>
					</div>
					<div className="form-group col-md-4">
						<select
							id="subtaskList"
							multiple
							style={{width: "100%"}}
							onChange={handleSelectedSubtaskChange}
						>
							{newSubtasks.map((subtask) => {
								return (
									<option key={subtask.id} value={subtask.id}>
										{subtask.name}
									</option>
								)
							})}
						</select>
					</div>
					<div className="form-group col-sm-1">
						<button className="btn btn-primary" onClick={removeSubtask}>Remove</button>
					</div>
				</div>
				<div className="row justify-content-center align-items-end">
					<div className="form-group col-sm-3">
						<label htmlFor="deadline">Deadline</label>
						<input
							type="date"
							value={deadline}
							onChange={handleDeadlineChange}
							className="form-control"
							id="deadline">
						</input>	
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="form-group col-sm-2" style={{marginTop: "100px"}}>
						<button type="submit" className="btn btn-primary" disabled={!fieldsFilled()}>
        					Save
     	 				</button>
					</div>
				</div>
			</form>
		</div>
	)
}