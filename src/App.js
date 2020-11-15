import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import TaskList from "./TaskList";
import AchievementPage from "./AchievementPage";
import AddTask from "./AddTask";
import CalendarExport from "./CalendarExport";
import PageNotFound from "./PageNotFound";
import PopUpMenu from "./PopUpMenu";
import { DataStoreContext } from "./contexts";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import {
  fetchTasks,
  fetchCategories,
  fetchAchievements,
  fetchSubtasks,
  destroySubtask,
  saveAchievement,
  fetchTask,
  destroyTask,
  saveTask,
} from "./api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [categories, setCategories] = useState([]);

  function createSuccessNotification(title, message){
    store.addNotification({
      title: title,
      message: message,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
      duration: 1000,
      }
    });
  }

  async function deleteSubtask(id, taskId){
    await destroySubtask(id);
    updateTaskProgress(taskId);
    createSuccessNotification("Subtask completed!", "Woohoo!");

    const newSubtasks = await fetchSubtasks();
    setSubtasks(newSubtasks);

    const userAchievement = await fetchAchievements().then((data) => {
      return data.find((achievement) => {
        return achievement.user_id === userId;
      })
    })

		// const userAchievement = achievements.find((achievement) => {
		// 	return achievement.user_id === userId;
		// })

		await saveAchievement({
			id: userAchievement.id,
			user_id: userId,
			tasks_completed: (userAchievement.tasks_completed+1),
		});

		fetchAchievements().then((data) => {
			setAchievements(data);
		})
  }

  async function updateTaskProgress(taskId){
    const prevTask = await fetchTask(taskId);

    // extra failproof
    const subTasks = await fetchSubtasks();

    const filteredSubtasks = subTasks.filter((subtask) => {
      return subtask.task_id === taskId;
    })

		if(filteredSubtasks.length === 0){
      destroyTask(taskId);
      createSuccessNotification("You finished a task!", "Let's gooo!");
			setTasks(tasks.filter((task) => {
				return task.id !== taskId;
			}))
		}
		else {
			await saveTask({
				id: taskId,
				user_id: prevTask.user_id,
				task_name: prevTask.task_name,
				deadline: prevTask.deadline,
				progress: (prevTask.total - filteredSubtasks.length),
				total: prevTask.total,
				category_id: prevTask.category_id,
			})
		}
  }

  useEffect(() => {
    Promise.all([
      fetchAchievements(),
      fetchCategories(),
      fetchTasks(),
      fetchSubtasks()
    ]).then(([achievements, categories, tasks, subtasks]) => {
      setTasks(tasks);
      setAchievements(achievements);
      setSubtasks(subtasks);
      setCategories(categories);
    });
  }, [userId]);

  return (
    <DataStoreContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currUser,
        setCurrUser,
        userName,
        setUserName,
        userId,
        setUserId,
        tasks,
        setTasks,
        subtasks,
        setSubtasks,
        categories,
        setCategories,
        achievements,
        setAchievements,
        deleteSubtask,
        createSuccessNotification,
        updateTaskProgress,
      }}
    >
      <Router>
        <ReactNotification />
        <PopUpMenu></PopUpMenu>
        <div className="container mt-5">
          <Switch>
            <Route path="/" exact={true}>
              <Home></Home>
            </Route>
            <Route path="/tasks" exact={true}>
              <TaskList></TaskList>
            </Route>
            <Route path="/achievements" exact={true}>
              <AchievementPage></AchievementPage>
            </Route>
            <Route path="/addtask" exact={true}>
              <AddTask></AddTask>
            </Route>
            <Route path="/export" exact={true}>
              <CalendarExport></CalendarExport>
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </DataStoreContext.Provider>
  );
}

export default App;
