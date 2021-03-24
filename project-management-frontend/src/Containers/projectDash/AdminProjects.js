//----------------------------------------------------------------------------------------------------------------------
// Imports; for webservices, styling and database access
import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button, Layout, Tag, Tooltip, Input } from 'antd';
import 'antd/dist/antd.css'
import classes from './Projects.module.css';
import AddFilterModal from '../projectDash/Modals/AddFilterModal';
import ProjectCard from '../projectDash/Modals/ProjectCardModal';
import { backendUrl } from '../../shared/utility';

//----------------------------------------------------------------------------------------------------------------------
// Antd design options defined
const { Search } = Input;

//----------------------------------------------------------------------------------------------------------------------
// Admin project dashboard for projects
export default class AdminProjects extends Component {

  //--------------------------------------------------------------------------------------------------------------------
  // Constructor; initialises the state
  constructor(props) {
    super(props);

    // Initialises state for active and pending project arrays as well as filter options
    this.state = {activeProjects: [], pendingProjects: [], archivedProjects: [],
      addFilterModalVisible: false, projectStatusFilter: 'Active', projectFilters: [], search: ""};
  }

  //--------------------------------------------------------------------------------------------------------------------
  // On page load; retrieve the project data from database
  componentDidMount() {

    // Retrieves all active projects from the database
    axios.get(`${backendUrl()}/projects/getAllActiveProjects`)
      .then(response => {
        this.setState({ activeProjects:response.data.data })
      })

      // Log error if unsuccessful
      .catch((error) => {
        console.log(error)
      })

    // Retrieves all pending projects from the database
    axios.get(`${backendUrl()}/projects/getAllPendingProjects`)
      .then(response => {
        this.setState({ pendingProjects:response.data.data })
      })

      // Log error if unsuccessful
      .catch((error) => {
        console.log(error)
      })

    // Retrieves all archived projects from the database
    axios.get(`${backendUrl()}/projects/getAllArchivedProjects`)
      .then(response => {
        this.setState({ archivedProjects:response.data.data })
      })

      // Log error if unsuccessful
      .catch((error) => {
        console.log(error)
      })

    // Retrives previous filters from memory
    if (localStorage.getItem('projectStatus') !== null){
      this.setState( {projectStatusFilter: localStorage.getItem('projectStatus')});
    }
    if (localStorage.getItem('projectFilters') !== null){
      try{
        this.setState( {projectFilters: JSON.parse(localStorage.getItem('projectFilters'))});
      } catch (e) {
        console.log("Error: cannot use project filter session data")
      }
    }
    if (localStorage.getItem('search') !== null){
      this.setState( {search: localStorage.getItem('search')});
    }

    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Sets the project status filter to show only related projects, also assigning to session
  setProjectsStatusFilter(props){
    this.setState({projectStatusFilter: props});
    localStorage.setItem('projectStatus', props);
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Sets the project add filter model to be visible
  showAddFilterModal(){
    this.setState({addFilterModalVisible: true})
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Sets the project add filter model to be hidden passing the container from madal object
  hideAddFilterModal(props){
    props.setState({addFilterModalVisible: false })
  }

  //--------------------------------------------------------------------------------------------------------------------
  // maps the search input to state, aslo adding to session
  onChangeSearch(e) {
    this.setState({ search : e.target.value });
    localStorage.setItem('search', e.target.value);
  }

  //--------------------------------------------------------------------------------------------------------------------
  // sorts a project array based on state fiilters
  fitlerSort  = (sortArray) =>  {

    const projectsFilters = this.state.projectFilters;
    let projectsArray = sortArray;
    let filteredArray = [];

    // For each project filter, check array
    for (let i = 0; i < projectsFilters.length; i++){
      if (projectsFilters[i].field === 'priorityScore'){
        for (let j = 0; j < projectsArray.length; j++){
          if (parseInt(projectsArray[j].projectScore) >= projectsFilters[i].valueInput1 &&
            parseInt(projectsArray[j].projectScore) <= projectsFilters[i].valueInput2 ||
            parseInt(projectsArray[j].projectScore) <= projectsFilters[i].valueInput1 &&
            parseInt(projectsArray[j].projectScore) >= projectsFilters[i].valueInput2) {
            filteredArray.push(projectsArray[j])
          }
        }
      }

      if (projectsFilters[i].field === 'estimatedCost'){
        for (let j = 0; j < projectsArray.length; j++){
          if ( projectsArray[j].businessCase !== null){
            if (parseInt(projectsArray[j].businessCase.estimatedCost) >= projectsFilters[i].valueInput1 &&
              parseInt(projectsArray[j].businessCase.estimatedCost) <= projectsFilters[i].valueInput2 ||
              parseInt(projectsArray[j].businessCase.estimatedCost) <= projectsFilters[i].valueInput1 &&
              parseInt(projectsArray[j].businessCase.estimatedCost) >= projectsFilters[i].valueInput2) {
              filteredArray.push(projectsArray[j])
            }
          }
        }
      }
    }

    return filteredArray;
  }

  //--------------------------------------------------------------------------------------------------------------------
  // sorts a project array based on state search
  searchSort  = (sortArray, searchVal) =>  {
    const search = searchVal;
    let filteredArray = sortArray;
    let returnArray = [];

    // Check all projects against search
    for (let i = 0; i < filteredArray.length; i++){
      let found = false;
      if (filteredArray[i].businessCase !== null) {
        if (filteredArray[i].id.toString().toLowerCase().includes(search) ||
          filteredArray[i].name.toLowerCase().includes(search) ||
          filteredArray[i].projectScore.toLowerCase().includes(search) ||
          filteredArray[i].projectSize.toLowerCase().includes(search) ||
          filteredArray[i].projectType.toLowerCase().includes(search) ||
          filteredArray[i].createdAt.includes(search) ||
          filteredArray[i].businessCase.benefit.toLowerCase().includes(search) ||
          filteredArray[i].businessCase.estimatedCost.toLowerCase().includes(search) ||
          filteredArray[i].businessCase.sponsor.toLowerCase().includes(search) ||
          filteredArray[i].businessCase.executiveSummary.toLowerCase().includes(search) ||
          filteredArray[i].businessCase.reason.toLowerCase().includes(search) ||
          filteredArray[i].businessCase.businessOption.toLowerCase().includes(search) ||
          filteredArray[i].businessCase.duration.toLowerCase().includes(search) ||
          filteredArray[i].businessCase.benefitTimescale.toLowerCase().includes(search) ||
          filteredArray[i].businessCase.negativeImpact.toLowerCase().includes(search) ||
          filteredArray[i].businessCase.customerImpactAndEngagement.toLowerCase().includes(search) ||
          filteredArray[i].businessCase.majorRisks.toLowerCase().includes(search) ||
          filteredArray[i].businessCase.diversityAndInclusionConsiderations.toLowerCase().includes(search) ||
          filteredArray[i].businessCase.investmentAppraisal.toLowerCase().includes(search)) {
          returnArray.push(filteredArray[i])
          found = true;
        }
      } else if (filteredArray[i].businessCase === null) {
        if (filteredArray[i].id.toString().toLowerCase().includes(search) ||
          filteredArray[i].name.toLowerCase().includes(search) ||
          filteredArray[i].projectSize.toLowerCase().includes(search) ||
          filteredArray[i].projectType.toLowerCase().includes(search) ||
          filteredArray[i].createdAt.includes(search)) {
          returnArray.push(filteredArray[i])
          found = true;
        }

      }

      // Check the search against users for each project
      if (found === false) {
        try{
          for (let j = 0; j < filteredArray[0].users.length; j++){

            if (filteredArray[0].users[j].firstName.includes(search) ||
              filteredArray[0].users[j].surname.includes(search) ||
              (filteredArray[0].users[j].firstName + " " + filteredArray[0].users[j].surname).includes(search) ||
              filteredArray[0].users[j].email.includes(search) ||
              filteredArray[0].users[j].role.includes(search)){
              returnArray.push(filteredArray[i])
              found = true;
              break;
            }
          }
        } catch (e) {
          console.log("no users")
        }
      }
    }

    return returnArray;
  }

  //--------------------------------------------------------------------------------------------------------------------
  // sorts a project array based on state fiilters
  projectSort  = (sortArray) =>  {

    const projectsFilters = this.state.projectFilters;
    let search = this.state.search.toLowerCase();
    let projectsArray = sortArray;
    let filteredArray = [];
    let returnArray = [];

    // If no project filters show entire array
    if (projectsFilters.length === 0){filteredArray = sortArray}
    else {
      filteredArray = this.fitlerSort(projectsArray)
    }

    search = search.split(',')

    returnArray = filteredArray

    if (search.length !== 1 || search[0] !== "") {
      for (let i = 0; i < search.length; i++) {
        returnArray = this.searchSort(returnArray, search[i].trim())
      }
    }


    return returnArray;
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Maps projects to table; sorting by priority score
  projectListActive(){
    let projectArray = this.projectSort(this.state.activeProjects);

    return projectArray.sort(function(a, b) {
      return b.priorityScore - a.priorityScore
    })
      .map(currentproject => {
        return <ProjectCard project={currentproject} key={currentproject.id}/>;
      })
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Maps projects to table; sorting by priority score
  projectListPending(){
    let projectArray = this.projectSort(this.state.pendingProjects);

    return projectArray.sort(function(a, b) {
      return b.priorityScore - a.priorityScore
    })
      .map(currentproject => {
        return <ProjectCard project={currentproject} key={currentproject.id}/>;
      })
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Maps projects to table; sorting by priority score
  projectListArchived(){
    let projectArray = this.projectSort(this.state.archivedProjects);

    return projectArray.sort(function(a, b) {
      return b.priorityScore - a.priorityScore
    })
      .map(currentproject => {
        return <ProjectCard project={currentproject} key={currentproject.id}/>;
      })
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Submit reject form
  filterList(){
    return(
    this.state.projectFilters.map(filter => (
        <td>
          <Tag key={filter.field}
            onClose={() => this.removeFilter(filter.field)}
            closable
          >{`${filter.field}  Between  ${filter.valueInput1}  and ${filter.valueInput2}`}</Tag>
        </td>
    )))

  }


  //--------------------------------------------------------------------------------------------------------------------
  // Add a filter
  addFilter = (values) => {

    // Gets form data into variable
    const newFilter = {
      field: values.filter,
      valueInput1: values.valueInput1,
      valueInput2: values.valueInput2
    }

    let returnArray = this.state.projectFilters;
    returnArray.push(newFilter)

    this.setState({projectFilters: returnArray })
    returnArray = JSON.stringify(returnArray);
    localStorage.setItem('projectFilters', returnArray);
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Removes filter by field
  removeFilter = (values) => {
    let returnArray = this.state.projectFilters;

    returnArray = returnArray.filter(function( obj ) {
      return obj.field !== values;
    });

    this.setState({projectFilters: returnArray })
    returnArray = JSON.stringify(returnArray);
    localStorage.setItem('projectFilters', returnArray);
  }

  //------------------------------------------------------------------------------------------------------------------
  // Render; Projects dashboard with filters
  render() {
    return (

      <div className={classes.Projects}>
        {/*----------------------------------------------------------------------------------------------------------*/}
        {/* Page title with button to show the add filter modal */}
        <h1>Project Dashboard</h1>
        <Button type="primary"
                onClick={() => this.showAddFilterModal()}>
          Add Filter +
        </Button>

        {/*----------------------------------------------------------------------------------------------------------*/}
        {/* Search form */}
        <Input placeholder="Search projects" allowClear className={classes.floatRightSearch} value={this.state.search} onChange={this.onChangeSearch}/>
        <br/><br/>{this.filterList()}<br/><br/>

        {/*----------------------------------------------------------------------------------------------------------*/}
        {/* Buttons to switch between project statuses */}
        <Button type={this.state.projectStatusFilter === 'Active' && "primary"} onClick={() =>
          this.setProjectsStatusFilter('Active')}>Active Projects
        </Button>
        <Button type={this.state.projectStatusFilter === 'Pending' && "primary"} onClick={() =>
          this.setProjectsStatusFilter('Pending')}>Pending Projects&ensp;
          <span className={classes.textHighlight}>&ensp;{this.state.pendingProjects.length}&ensp;</span>
        </Button>
        <Button type={this.state.projectStatusFilter === 'Archived' && "primary"} onClick={() =>
          this.setProjectsStatusFilter('Archived')}>Archived Projects
        </Button>

        {/*----------------------------------------------------------------------------------------------------------*/}
        {/* Table for active projects, mapping the data from the database */}
        <table className={classes.Table}>
          <tbody>

            {/*--------------------------------------------------------------------------------------------------------*/}
            {/* Table headers */}
            <tr  key={1}>
              <th>Project ID</th>
              <th>Project name</th>
              {this.state.projectStatusFilter !== 'Pending' && (
                <th>Priority Score</th>
              )}
              <th>Description</th>
              {this.state.projectStatusFilter === 'Active' && (
                <th>Users</th>
              )}
              {this.state.projectStatusFilter !== 'Pending' && (
                <>
                  <th>Date started</th>
                  <th>Estimated end</th>
                </>
              )}
              <th>Size</th>
              <th>Project Type</th>
              {this.state.projectStatusFilter === 'Pending' && (
                <>
                  <th>Review</th>
                </>
              )}
            </tr>

          {/*--------------------------------------------------------------------------------------------------------*/}
          {/* Populates table rows from the state activeProjects array */}

            { this.state.projectStatusFilter === 'Active' && (
              this.projectListActive()
              )}
            { this.state.projectStatusFilter === 'Pending' && (
              this.projectListPending()
            )}
            { this.state.projectStatusFilter === 'Archived' && (
              this.projectListArchived()
            )}
          </tbody>
        </table>

        {/*----------------------------------------------------------------------------------------------------------*/}
        {/* Uses the imported add filter modal binding variables */}
        <AddFilterModal
          visible={this.state.addFilterModalVisible}
          hideModal={()=> this.hideAddFilterModal(this)}
          refreshUsers={this.refreshDash}
          onSubmit={this.addFilter}
        />
      </div>
    );
  }
}
