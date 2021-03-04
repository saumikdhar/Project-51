//----------------------------------------------------------------------------------------------------------------------
// Imports; for webservices, styling and database access
import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button, Layout } from 'antd';
import 'antd/dist/antd.css'

//----------------------------------------------------------------------------------------------------------------------
// Function component (no state/ lifecycle used) for Active Projects
// Maps project data to table rows
const ProjectCard = props => (
  <tr>
    <td>{props.project.id}</td>
    <td>{props.project.name}</td>
    <td>{props.project.projectScore}</td>
    <td>A new application to speed the process</td>
    <td>04/02/2021</td>
    <td>{props.project.managerName}</td>
    <td>{props.project.transformationLead}</td>
    <td>{props.project.projectSize}</td>
    <td>{props.project.projectType}</td>
    <td>
      <Link  to={"/projectinfo/" + props.project.id}><Button>View</Button></Link>
    </td>
  </tr>
)

//----------------------------------------------------------------------------------------------------------------------
// Admin project dashboard for active projects
export default class project_dash_active_Component extends Component {

  //--------------------------------------------------------------------------------------------------------------------
  // Constructor; initialises the state
  constructor(props) {
    super(props);

    // Initialises state for active and pending project arrays
    this.state = {activeProjects: [], pendingProjects: []};
  }

  //--------------------------------------------------------------------------------------------------------------------
  // On page load; retrieve the project data from database
  componentDidMount() {

    // Retrieves all active projects from the database
    axios.get('http://localhost:8080/projects/getAllActiveProjects')
      .then(response => {
        this.setState({ activeProjects:response.data.data })
      })

      // Log error if unsuccessful
      .catch((error) => {
        console.log(error)
      })

    // Retrieves all pending projects from the database
    axios.get('http://localhost:8080/projects/getAllPendingProjects')
      .then(response => {
        this.setState({ pendingProjects:response.data.data })
      })

      // Log error if unsuccessful
      .catch((error) => {
        console.log(error)
      })
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Maps projects to table; sorting by priority score
  projectList(){
    return this.state.activeProjects.sort(function (a, b){return b.priorityScore - a.priorityScore})
      .map(currentproject => { return <ProjectCard project = {currentproject}  key={currentproject.id}/>;
      })
  }

  //------------------------------------------------------------------------------------------------------------------
  // Render; Projects dashboard with filters
  render() {
    return (
      <div className={"container"}>
        {/*----------------------------------------------------------------------------------------------------------*/}
        {/* Page title with drop down filter options */}
        <h3>&nbsp; Project Dash &nbsp;</h3>
        <form className="dropdown">
          <select className="btn btn-secondary dropdown-toggle" type="button" name="cars" id="cars">
            <option value="volvo">Add Filter</option>
            <option value="saab">Manager</option>
            <option value="opel">Size</option>
            <option value="audi">Date</option>
          </select>
        </form>

        {/*----------------------------------------------------------------------------------------------------------*/}
        {/* Search form */}
        <div className="float-right">
          <div className="input-group">
            <div className="form-outline">
              <input type="search" id="form1" placeholder={"Search"} className="form-control"/>
            </div>
            <button type="button" onClick={() => this.setState({action: true})} className="btn btn-primary">Search
            </button>
          </div></div><br></br>


        {/*----------------------------------------------------------------------------------------------------------*/}
        {/* Buttons to switch between project statuses */}
        <Button type="primary">Active Projects</Button>
        <Link  to={"/adminPendingDash"}><Button>Pending Projects
          &ensp;{this.state.pendingProjects.length}&ensp;</Button>
        </Link>


        {/*----------------------------------------------------------------------------------------------------------*/}
        {/* Table for active projects, mapping the data from the database */}
        <Layout>
          <table className={"table"}>

            {/*--------------------------------------------------------------------------------------------------------*/}
            {/* Table headers */}
            <thead className={"thead-light"}>
            <tr>
              <th>Project ID</th>
              <th>Project name</th>
              <th>Priority Score</th>
              <th>Description</th>
              <th>Date started</th>
              <th>Manager</th>
              <th>Transformation Lead</th>
              <th>Size</th>
              <th>Project Type</th>
              <th>Action</th>
            </tr>
            </thead>

            {/*--------------------------------------------------------------------------------------------------------*/}
            {/* Populates table rows from the state activeProjects array */}
            <tbody>
            { this.projectList() }
            </tbody>
          </table>
        </Layout>
      </div>
    );
  }
}
