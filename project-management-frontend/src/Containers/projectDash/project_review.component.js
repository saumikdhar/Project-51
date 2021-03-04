//----------------------------------------------------------------------------------------------------------------------
// Imports; for webservices, styling and database access
import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css'

//----------------------------------------------------------------------------------------------------------------------
// Admin review pending project details
export default class project_review_Component extends Component {

    //------------------------------------------------------------------------------------------------------------------
    // Constructor; initialises the state
    constructor(props) {
      super(props);

      // Binds all methods in the class to the correct implementation
      this.onChangeManager = this.onChangeManager.bind(this);
      this.onChangeTransformationLead = this.onChangeTransformationLead.bind(this);
      this.onChangeQuestions = this.onChangeQuestions.bind(this);
      this.onSubmitAccept = this.onSubmitAccept.bind(this);
      this.onSubmitReject = this.onSubmitReject.bind(this);

      // Initialises state for project information and business information aswell as form fields
      this.state = {Projectinfo: [], BusinessInfo: [], manager: '', transformationLead: '', questions: "",};
    }

    //------------------------------------------------------------------------------------------------------------------
    // On page load; retrieve the project data from database
    componentDidMount() {

        // Retrieves all project information by project id form the database
        axios.get('http://localhost:8080/projects/projectdetails/'+this.props.match.params.id)
          .then(response => {
            this.setState({ Projectinfo:response.data.data })
          })

          // Log error if unsuccessful
          .catch((error) => {
              console.log(error)
          })

      // Retrieves all business case information by project id form the database
      axios.get('http://localhost:8080/businessCase/getBusinessCase/' + this.props.match.params.id)
        .then(response => {
          this.setState({ BusinessInfo:response.data.data[0] })
        })

        // Log error if unsuccessful
        .catch((error) => {
          console.log(error)
        })

    }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the manager from a form
  onChangeManager(e) {
    this.setState({
      manager: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the transfomationlead from a form
  onChangeTransformationLead(e) {
    this.setState({
      transformationLead: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the duration from a form
  onChangeQuestions(e) {
    this.setState({
      questions: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Submit accept form
  onSubmitAccept(e) {
    e.preventDefault();

    // Gets form data into variable
    const projectUpdate = {
      manager: this.state.manager,
      transformationLead: this.state.transformationLead
    }

    // Submits the data
    console.log("DBG: form data");
    console.log(projectUpdate);

    axios.post('http://localhost:8080/projects/accept/' + this.props.match.params.id, projectUpdate)
      .then(res => console.log(res.data))

    // return to dashboard
    window.location = '/adminActiveDash';
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Submit reject form
  onSubmitReject(e) {
    e.preventDefault();

    // Gets form data into variable
    const projectUpdate = {
      questions: this.state.questions
    }

    // Submits the data
    console.log("DBG: form data");
    console.log(projectUpdate);

    axios.post('http://localhost:8080/projects/reject/' + this.props.match.params.id, projectUpdate)
      .then(res => console.log(res.data))

    // return to dashboard
    window.location = '/adminPendingDash';
  }

    //------------------------------------------------------------------------------------------------------------------
    // Render; Projects dashboard with filters
    render() {
        return (
          <div className={"container"}>

            {/*------------------------------------------------------------------------------------------------------*/}
            {/* Page title */}
            <h3>&nbsp; Project Dash &nbsp;</h3>

            {/*------------------------------------------------------------------------------------------------------*/}
            {/* Buttons to return to the admin project pending dashboard */}
            <Link  to={"/adminPendingDash"}><Button type="primary"  style={{ background: "green"}}>Back to table</Button></Link>

            {/*------------------------------------------------------------------------------------------------------*/}
            {/* Display project and business case information */}
            <div className={"container"}>
              <br></br><p>Project Id: {this.state.Projectinfo.id}</p>
              <p>Project Name: {this.state.Projectinfo.name}</p>
              <p>Priority Score: {this.state.Projectinfo.projectScore}</p>
              <p>Project Size: {this.state.Projectinfo.projectSize}</p>
              <p>Project Type: {this.state.Projectinfo.projectType}</p>
              <p>Comments: {this.state.Projectinfo.questions}</p>
              <p>Benefit: {this.state.BusinessInfo.benefit}</p>
              <p>Estimated Cost: {this.state.BusinessInfo.estimatedCost}</p>
              <p>Sponsor: {this.state.BusinessInfo.sponsor}</p>
              <p>Executive Summary: {this.state.BusinessInfo.executiveSummary}</p>
              <p>Reason: {this.state.BusinessInfo.reason}</p>
              <p>Business Option: {this.state.BusinessInfo.businessOption}</p>
              <p>Duration: {this.state.BusinessInfo.duration}</p>
              <p>Benefit Timescale: {this.state.BusinessInfo.benefitTimescale}</p>
              <p>Negative Impact: {this.state.BusinessInfo.negativeImpact}</p>
              <p>Customer Impact And Engagement: {this.state.BusinessInfo.customerImpactAndEngagement}</p>
              <p>Major Risks: {this.state.BusinessInfo.majorRisks}</p>
              <p>Diversity And Inclusion Considerations: {this.state.BusinessInfo.diversityAndInclusionConsiderations}</p>
              <p>Investment Appraisal: {this.state.BusinessInfo.investmentAppraisal}</p>
            </div>

            {/*------------------------------------------------------------------------------------------------------*/}
            {/* Accept project form to move project to active and assign manager and transformation lead */}
            <hr></hr>
            <div className={"container"}>
              <h4>Accept project</h4>
              <form  onSubmit = {this.onSubmitAccept}>
                <label>Assign project manager: </label>
                <input type={"text"}
                       required
                       className={"form-control"}
                       value={this.state.manager}
                       onChange={this.onChangeManager}
                />
                <label>&nbsp; Assign transition lead: &nbsp;</label>
                <input type={"text"}
                       required
                       className={"form-control"}
                       value={this.state.transformationLead}
                       onChange={this.onChangeTransformationLead}
                />

                <input type={"submit"} value={"Accept Project"} className={"btn btn-success"}/>
              </form>
            </div>

            {/*------------------------------------------------------------------------------------------------------*/}
            {/* Reject project form to move project to reject and add notes */}
            <hr></hr>
            <div className={"container"}>
              <h4>Reject project</h4>
              <form onSubmit = {this.onSubmitReject}>
                <label>&nbsp; Reason for rejection: &nbsp;</label>
                <input type={"text-box"}
                       required
                       className={"form-control"}
                       value={this.state.questions}
                       onChange={this.onChangeQuestions}
                />

                <input type={"submit"} value={"Reject Project"} className={"btn btn-danger"}/>
              </form>
            </div><br></br>
          </div>
        );
    }
}
