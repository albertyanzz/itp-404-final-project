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
import { fetchTasks, fetchCategories, fetchAchievements, fetchSubtasks } from './api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(1);

  const [tasks, setTasks] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [categories, setCategories] = useState([]);

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
  }, []);

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
        achievements
      }}
    >
      <Router>
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
