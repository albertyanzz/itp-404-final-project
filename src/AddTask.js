import React, { useEffect, useState } from "react";
import AddCategoryModal from './AddCategoryModal';

export default function AddTask(){

	const [name, setName] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("DEFAULT");
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [categories, setCategories] = useState([]);
	const [deadline, setDeadline] = useState("");
	const [subtask, setSubtask] = useState("");
	const [subtasks, setSubtasks] = useState([]);
	const [selectedSubtask, setSelectedSubtask] = useState("");

	function hideCategoryModal(){
		setCategoryModalOpen(false);
	}

	function handleSubmit(event) {
		event.preventDefault();

		setName("");
		setSelectedCategory(0);
		setDeadline("");
		setSubtask("");
		setSubtasks([]);
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
			name: newCategory,
			id: categories.length,
		}
		setCategories(categories.concat([cat]));
		setSelectedCategory(cat.id);
		setCategoryModalOpen(false);
	}

	function addSubtask(){
		const task = {
			name: subtask,
			id: subtasks.length,
		}
		setSubtasks(subtasks.concat([task]));
		setSubtask("");
	}

	function removeSubtask(event){
		event.preventDefault();

		setSubtasks(subtasks.filter((subtask) => {
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
	
		const testCategories = [
			{
				name: "School",
				id: 0,
			},
			{
				name: "Work",
				id: 1,
			},
			{
				name: "Club",
				id: 2,
			}
			
		];
		setCategories(testCategories);
	}, []);

	return(
		<div>
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
										{category.name}
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
							{subtasks.map((subtask) => {
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
					<div className="form-group col-sm-2">
						<button type="submit" className="btn btn-primary" disabled={!fieldsFilled()}>
        			Save
     	 			</button>
					</div>
				</div>
			</form>
		</div>
	)
}