import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './Home';
import TaskList from './TaskList';
import AchievementPage from './AchievementPage';
import AddTask from './AddTask';
import CalendarExport from './CalendarExport';
import PageNotFound from './PageNotFound';


function App() {
  return (
    <Router>
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
  );
}

export default App;
