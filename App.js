import { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";
import Navbar from "./components/navBar/Navbar";
//import Sidebar from "./components/sideBar/sideBar";
import Dashboard from "./components/Dashboard/Dashboard";
//18th oct
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; //this will provide ability to navigate among pages
import ShowTaskBackLog from "./components/calendar/calendar";
import Tasks from "./components/tasks/tasks";
import { Redirect } from "react-router-dom";
import TasksMore from "./components/tasksMore/tasksMore";
import TasksBoard from "./components/tasksBoard/tasksBoard";
import Projects from "./components/projects/projects";
import TimeLogs from "./components/timeLogs/timeLogs";
import ProjectsDetails from "./components/projects/projectsDetails";
import AdminPanel from "./components/adminPanel/Admin Dashboard/adminDashboard";
import AdminNavBar from "./components/adminPanel/Admin Navbar/adminNavbar.js";
import WeatherApp from "./components/calendar/calendar-subcomponents/weather/weatherApp"
import Reports from "./components/adminPanel/Reports/reports";
import ProjectAdmin from './components//adminPanel/admin Projects/adminProjects'


function App() {
  const [user, setUser] = useState({ name: "", email: "", token: "", id: "", role: "" });
  const [error, setError] = useState("");
  const [logorcreate, setLogorCreate] = useState(false);

  const Login = (data) => {
    setUser({
      name: data.employee.name,
      email: data.employee.email,
      token: data.token,
      id: data.employee.id,
      role: data.employee.role
    });
  };
  const Logout = () => {
    setUser({ name: "", email: "", token: "", id: "" });
    setError("");
    setLogorCreate(false);
    localStorage.clear();
    <Route exact path="/">
      <Redirect to="/" />
    </Route>
  };
  const Logerror = (err) => {
    setError(err);
  };
  const Logorcreate = () => {
    if (logorcreate) {
      setLogorCreate(false);
    } else {
      setLogorCreate(true);
    }
    setError("");
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const founduser = JSON.parse(loggedInUser);
      setUser({
        name: founduser.employee.name,
        email: founduser.employee.email,
        token: founduser.token,
        id: founduser.employee.id,
        role: founduser.employee.role,
      });
    }
  }, []);

  return (
    <Router>
      <div >
        {user.id !== "" ? (
          <div>
          {user.role === 0 ?(
          <div>
            <Route>
              <Navbar logout = {Logout} />
            </Route>
            <Route exact path="/">
              <Redirect to="/Dashboard" />
            </Route>
            <Route path="/Dashboard">
              <Dashboard id={user.id} email={user.email} />
            </Route>
            <Route path="/api/taskBackLog">
                  <ShowTaskBackLog />
                  <WeatherApp />
                </Route>
            <Route path="/projects">
              <Projects />
            </Route>
            <Route path="/projectsDetails">
              <ProjectsDetails/>
            </Route>
            <Route path="/tasks">
              <Tasks />
            </Route>
            <Route path="/tasksMore">
              <TasksMore/>
            </Route>
            <Route path="/tasksBoard">
              <TasksBoard/>
            </Route>
            <Route path="/timeLogs">
              <TimeLogs/>
            </Route>
          </div>
            ):<div>
            
           {/*Admin panel components*/} 
            <Route>
              <AdminNavBar logout = {Logout} />
            </Route>            
            <Route exact path="/">
              <Redirect to="/adminPanel" />
            </Route>
            <Route path="/adminPanel">
              <AdminPanel/>
            </Route>
            <Route path="/reports">
              <Reports/>
            </Route>
<<<<<<< HEAD
            
=======
            <Route path="/projects">
              <ProjectAdmin/>
            </Route>
            <Route path="/projects/account">
            </Route>
>>>>>>> 6b1a506a248fd5da6db491c5df160d22fdf72587
          </div>   }
          </div>
        ) : logorcreate === true ? (
          <div>
            <SignUp
              Login={Login}
              Logerror={Logerror}
              error={error}
              check={Logorcreate}
            />
          </div>
        ) : (
          <div>
            <LoginForm
              Login={Login}
              Logerror={Logerror}
              error={error}
              check={Logorcreate}
            />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
