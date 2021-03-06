import React, {Component} from 'react'
import "./navBarStyle.css"
import { withRouter } from "react-router-dom";

class Navbar extends Component{
    constructor(props) {
        super(props);
        const loggedInUser = localStorage.getItem("user");
        const founduser = JSON.parse(loggedInUser);
        this.state = {
            nav:{
                selectedHome: true,
                selectedProjects: false,
                selectedTasks: false,
                selectedCalendar: false,
                selectedTimeLogs: false,
            },
            name: founduser.employee.name,
            id:founduser.employee.id,

        }
    }

    componentDidMount() {
        const nav = localStorage.getItem("Nav");
        const data = JSON.parse(nav);
        if(data!=null){
            this.setState({
                nav:{
                    selectedHome:data.selectedHome,
                    selectedProjects:data.selectedProjects,
                    selectedTasks:data.selectedTasks,
                    selectedCalendar:data.selectedCalendar,
                    selectedTimeLogs:data.selectedTimeLogs,
                    selectedLogout:data.selectedLogout
                }
            },function (){
                console.log("Reloaded Nav ",this.state.nav)
            })
        }
    }

    logOut(){
        this.props.history.push("/");
        this.props.logout();
    }
    changeColorHome(){
        this.setState({
            nav:{
                selectedHome:true,
                selectedProjects:false,
                selectedTasks:false,
                selectedCalendar:false,
                selectedTimeLogs:false,
                selectedLogout:false
            }
        },function (){
            localStorage.setItem('Nav', JSON.stringify(this.state.nav))
            this.props.history.push("/Dashboard");
        })
    }
    changeColorProjects(){
        this.setState({
            nav:{
                selectedHome:false,
                selectedProjects:true,
                selectedTasks:false,
                selectedCalendar:false,
                selectedTimeLogs:false,
                selectedLogout:false
            }
        },function (){
            localStorage.setItem('Nav', JSON.stringify(this.state.nav))
            this.props.history.push("/projects")
        })

    }
    changeColorTasks(){
        this.setState({
            nav:{
                selectedHome:false,
                selectedProjects:false,
                selectedTasks:true,
                selectedCalendar:false,
                selectedTimeLogs:false,
                selectedLogout:false
            }
        },function (){
            localStorage.setItem('Nav', JSON.stringify(this.state.nav))
            this.props.history.push("/tasks");
        })
    }
    changeColorCalendar(){
        this.setState({
            nav:{
                selectedHome:false,
                selectedProjects:false,
                selectedTasks:false,
                selectedCalendar:true,
                selectedTimeLogs:false,
                selectedLogout:false
            }
        },function(){
            localStorage.setItem('Nav', JSON.stringify(this.state.nav))
            this.props.history.push("/api/taskBackLog");
        })
    }
    changeColorTimeLogs(){
        this.setState({
            nav:{
                selectedHome:false,
                selectedProjects:false,
                selectedTasks:false,
                selectedCalendar:false,
                selectedTimeLogs:true,
                selectedLogout:false
            }
        },function(){
            localStorage.setItem('Nav', JSON.stringify(this.state.nav))
            this.props.history.push("/timeLogs");
        })
    }

    render(){

        let linkClassHome = this.state.nav.selectedHome ? "nav-link text-danger " : "nav-link text-light";
        let linkClassProjects = this.state.nav.selectedProjects ? "nav-link text-danger" : "nav-link text-light";
        let linkClassTasks = this.state.nav.selectedTasks ? "nav-link text-danger" : "nav-link text-light";
        let linkClassCalendar = this.state.nav.selectedCalendar? "nav-link text-danger" : "nav-link text-light";
        let linkClassTimeLogs = this.state.nav.selectedTimeLogs ? "nav-link text-danger" : "nav-link text-light";
        let linkClassLogout = this.state.nav.selectedLogout ? "nav-link text-danger" : "nav-link text-light";
        return (
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="logoContainer">
                    <h5 className="logo">P</h5>
                    <h5 className="logo">R</h5>
                    <h5 className="logoRed">O</h5>
                    <h5 className="logo">J</h5>
                    <h5 className="logo">E</h5>
                    <h5 className="logo">C</h5>
                    <h5 className="logo">T</h5>
                </div>

                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className=" nav-item active">
                            <a  className={linkClassHome} aria-current="page" href="#" onClick={this.changeColorHome.bind(this)}>Home</a>
                            </li>
                            <li className="nav-item" >
                                <a className={linkClassProjects} href="#" onClick={this.changeColorProjects.bind(this)}>Projects</a>
                            </li>
                            <li className="nav-item">
                                <a className={linkClassTasks} href="#" onClick={this.changeColorTasks.bind(this)}>Tasks</a>
                            </li>
                            <li className="nav-item">
                                <a className={linkClassCalendar} href="#" onClick={this.changeColorCalendar.bind(this)}>Calendar</a>
                            </li>
                            <li className="nav-item">
                                <a className={linkClassTimeLogs} href="#" onClick={this.changeColorTimeLogs.bind(this)}>Time Logs</a>
                            </li>
                            <div className="nav-item logOut" onClick={this.logOut.bind(this)}>
                                <h7>Log out</h7>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="user">
                    <img className="notification" src={require('../../assests/images/notifications.png').default}/>
                    <div className="userText">
                        <h7 className="userNameText">Welcome {this.state.name}</h7>
                        <p></p>
                    </div>
                    <img className="avatar" src={require('../../assests/images/avatar.jpeg').default}/>
                </div>

            </nav>
        )
    }

}

export default withRouter(Navbar);
