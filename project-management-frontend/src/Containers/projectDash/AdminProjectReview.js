//----------------------------------------------------------------------------------------------------------------------
// Imports; for webservices, styling and database access
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, Select, Input, InputNumber, Tooltip, Tag } from 'antd';
import 'antd/dist/antd.css';
import classes from './Projects.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";
import { addUserToProject } from '../../store/actions';
import ProjectCard from './Modals/ProjectCardModal';

//----------------------------------------------------------------------------------------------------------------------
// Antd design options defined
const FormItem = Form.Item;
const Option = Select.Option;

const QuestionCard = props => {
  return(
    <tr>
      <td>{props.question.question}</td>
      <td>{JSON.stringify(props.question.answers)}</td>
    </tr>
      )}

//----------------------------------------------------------------------------------------------------------------------
// Admin review pending project details
class AdminProjectReview extends Component {


  //------------------------------------------------------------------------------------------------------------------
  // Constructor; initialises the state
  constructor(props) {
    super(props);

    // Initialises state for project information and business information aswell as form fields
    this.state = {
      Projectinfo: [], BusinessInfo: [], questionsArray: [], displayInfo: 'Project',
      quickWin: 'isQuickWin', priorityScore: '', questions: '',
      benefit: '', estimatedCost: '', sponsor: '', executiveSummary: '',
      reason: '', businessOption: '', benefitTimescale: '', duration: new Date(),
      negativeImpact: '', customerImpact: '', majorRisks: '',
      diversityAndInclusion: '', investmentAppraisal: ''
    };

    const {addUserToProject} = props
    // Binds all methods in the class to the correct implementation
    this.onChangeQuickWin = this.onChangeQuickWin.bind(this);
    this.onChangePriorityScore = this.onChangePriorityScore.bind(this);
    this.onChangeQuestions = this.onChangeQuestions.bind(this);
    this.onChangeBenefit = this.onChangeBenefit.bind(this);
    this.onChangeEstimatedCost = this.onChangeEstimatedCost.bind(this);
    this.onChangeSponsor = this.onChangeSponsor.bind(this);
    this.onChangeExecutiveSummary = this.onChangeExecutiveSummary.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeBusinessOption = this.onChangeBusinessOption.bind(this);
    this.onChangeBenefitTimescale = this.onChangeBenefitTimescale.bind(this);
    this.onChangeNegativeImpact = this.onChangeNegativeImpact.bind(this);
    this.onChangeCustomerImpact = this.onChangeCustomerImpact.bind(this);
    this.onChangeMajorRisks = this.onChangeMajorRisks.bind(this);
    this.onChangeDiversityAndInclusion = this.onChangeDiversityAndInclusion.bind(this);
    this.onChangeInvestmentAppraisal = this.onChangeInvestmentAppraisal.bind(this);
    this.onSubmitAccept = this.onSubmitAccept.bind(this);
    this.onSubmitReject = this.onSubmitReject.bind(this);
  }

  //------------------------------------------------------------------------------------------------------------------
  // On page load; retrieve the project data from database
  componentDidMount() {

    // Retrieves all project information by project id form the database
    axios.get('http://localhost:8080/projects/projectdetails/' + this.props.match.params.id)
      .then(response => {
        let tempArray = response.data.data
        this.setState({ questionsArray: tempArray.questions });
        delete tempArray.questions
        this.setState({ Projectinfo: tempArray });
      })

      // Log error if unsuccessful
      .catch((error) => {
        console.log(error);
      });

    // Retrieves all business case information by project id form the database
    axios.get('http://localhost:8080/businessCase/getBusinessCase/' + this.props.match.params.id)
      .then(response => {
        this.setState({ BusinessInfo: response.data.data[0] });

        if (JSON.stringify(response.data.data) !== "[]") {
          this.setState({ benefit: response.data.data[0].benefit,
            estimatedCost: response.data.data[0].estimatedCost, sponsor: response.data.data[0].sponsor,
            executiveSummary: response.data.data[0].executiveSummary, reason: response.data.data[0].reason,
            businessOption: response.data.data[0].businessOption,
            benefitTimescale: response.data.data[0].benefitTimescale,
            negativeImpact: response.data.data[0].negativeImpact,
            customerImpact: response.data.data[0].customerImpactAndEngagement,
            majorRisks: response.data.data[0].majorRisks,
            diversityAndInclusion: response.data.data[0].diversityAndInclusionConsiderations,
            investmentAppraisal: response.data.data[0].investmentAppraisal });
        }
      })

      // Log error if unsuccessful
      .catch((error) => {
        console.log(error);
      });

    // Retrieves management user information form the database
    axios.get('http://localhost:8080/users/getManagementUsers')
      .then(response => {
        this.setState({ managmentUsers: response.data.data });
      })

      // Log error if unsuccessful
      .catch((error) => {
        console.log(error);
      });

  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the manager from a form
  onChangeQuickWin(e) {
    this.setState({
      quickWin: e
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the transfomation lead from a form
  onChangePriorityScore(e) {
    this.setState({
      priorityScore: e
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the question from a form
  onChangeQuestions(e) {
    this.setState({
      questions: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the benefit from a form
  onChangeBenefit(e) {
    this.setState({
      benefit: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the estimatedCost from a form
  onChangeEstimatedCost(e) {
    this.setState({
      estimatedCost: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the sponsor from a form
  onChangeSponsor(e) {
    this.setState({
      sponsor: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the summary from a form
  onChangeExecutiveSummary(e) {
    this.setState({
      executiveSummary: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the reason from a form
  onChangeReason(e) {
    this.setState({
      reason: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the businessOption from a form
  onChangeBusinessOption(e) {
    this.setState({
      businessOption: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the duration from a form
  onChangeDuration(e) {
    this.setState({
      duration: e
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the benefitTimescale from a form
  onChangeBenefitTimescale(e) {
    this.setState({
      benefitTimescale: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the negativeImpact from a form
  onChangeNegativeImpact(e) {
    this.setState({
      negativeImpact: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the customerImpact from a form
  onChangeCustomerImpact(e) {
    this.setState({
      customerImpact: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the majorRisks from a form
  onChangeMajorRisks(e) {
    this.setState({
      majorRisks: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the diversityAndInclusion from a form
  onChangeDiversityAndInclusion(e) {
    this.setState({
      diversityAndInclusion: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Update the diversityAndInclusion from a form
  onChangeInvestmentAppraisal(e) {
    this.setState({
      investmentAppraisal: e.target.value
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Submit accept form
  onSubmitAccept(e) {

    const token = localStorage.getItem('token');
    const header = { Authorization: 'Bearer ' + token };
    let acceptUpdate = '';

    // Gets form data into variable
    if (this.state.quickWin === 'isQuickWin'){
      acceptUpdate = {
        quickWin: this.state.quickWin,
        priorityScore: this.state.priorityScore
      };
    } else if (this.state.quickWin === 'notQuickWin') {
      acceptUpdate = {
        quickWin: this.state.quickWin,
        priorityScore: this.state.priorityScore,
        benefit: this.state.benefit,
        estimatedCost: this.state.estimatedCost, sponsor: this.state.sponsor,
        executiveSummary: this.state.executiveSummary, reason: this.state.reason,
        duration: this.state.duration,
        businessOption: this.state.businessOption,
        benefitTimescale: this.state.benefitTimescale,
        negativeImpact: this.state.negativeImpact,
        customerImpact: this.state.customerImpact,
        majorRisks: this.state.majorRisks,
        diversityAndInclusion: this.state.diversityAndInclusion,
        investmentAppraisal: this.state.investmentAppraisal
      };
    }

    // Submits the data
    axios.post('http://localhost:8080/projects/accept/' + this.props.match.params.id, acceptUpdate)
    .then(res => {
      console.log(res.data);
      this.props.history.push('/adminDash');
    })
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Submit reject form
  onSubmitReject(e) {

    // Gets form data into variable
    const projectUpdate = {
      questions: this.state.questions
    };

    // Submits the data
    axios.post('http://localhost:8080/projects/reject/' + this.props.match.params.id, projectUpdate)
      .then(res => {
        console.log(res.data);
        this.props.history.push('/adminDash');
      });
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Sets the display filter to show only related information
  setDisplayFilter(props){
    this.setState({displayInfo: props});
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Maps projects to table; sorting by priority score
  questionMap(){
    const questArray = this.state.questionsArray;
    let sortedQuestArray = []

    for (let i=0; i < this.state.questionsArray.length; i++){
      if (typeof(questArray[i].answers[0]) != "undefined"){
        sortedQuestArray.push(questArray[i])
      }
    }
    return(sortedQuestArray.map(currentquestion => {
        return <QuestionCard question={currentquestion} key={currentquestion.id}/>;
      }))
  }

  //------------------------------------------------------------------------------------------------------------------
  // Render; Projects dashboard with filters
  render() {
    return (
      <div className={classes.Projects}>

        {/*------------------------------------------------------------------------------------------------------*/}
        {/* Page title */}
        <h1>Review Project: {this.state.Projectinfo.name}</h1>

        {/*------------------------------------------------------------------------------------------------------*/}
        {/* Buttons to return to the admin project pending dashboard */}
        <Link to={'/adminDash'}><Button type="primary">Back to table</Button></Link><br/><br/>

        {/*----------------------------------------------------------------------------------------------------------*/}
        {/* Buttons to switch between project statuses */}
        <Button type={this.state.displayInfo === 'Project' && "primary"} onClick={() =>
          this.setDisplayFilter('Project')}>Project Information
        </Button>
        {typeof this.state.BusinessInfo !== "undefined" && (
          <Button type={this.state.displayInfo === 'Business' && "primary"} onClick={() =>
            this.setDisplayFilter('Business')}>Business Information
          </Button>
        )}
        <Button type={this.state.displayInfo === 'Question' && "primary"} onClick={() =>
          this.setDisplayFilter('Question')}>Attached Questionnaire
        </Button>

        {/*------------------------------------------------------------------------------------------------------*/}
        {/* Display project and business case information */}
        <table className={classes.Table}>
          <tbody>

          {this.state.displayInfo === 'Project' && (
            <>
              <tr>
                <td>Project Id</td>
                <td>{this.state.Projectinfo.id}</td>
              </tr>
              <tr>
                <td>Project Name</td>
                <td>{this.state.Projectinfo.name}</td>
              </tr>
              <tr>
                <td>Create At</td>
                <td>{this.state.Projectinfo.createdAt}</td>
              </tr>
              {this.state.BusinessInfo === [] && (
              <tr>
                <td>Proposed Duration</td>
                <td>{this.state.BusinessInfo.duration}</td>
              </tr>
              )}
              <tr>
                <td>Project Type</td>
                <td>{this.state.Projectinfo.projectType}</td>
              </tr>
              <tr>
                <td>Comments</td>
                <td>{this.state.Projectinfo.questions}</td>
              </tr>
            </>
          )}

          {this.state.displayInfo === 'Business' && (
            <>
              <tr>
                <td>Benefit</td>
                <td>{this.state.BusinessInfo.benefit}</td>
              </tr>
              <tr>
                <td>Estimated Cost</td>
                <td>{this.state.BusinessInfo.estimatedCost}</td>
              </tr>
              <tr>
                <td>Sponsor</td>
                <td>{this.state.BusinessInfo.sponsor}</td>
              </tr>
              <tr>
                <td>Executive Summary</td>
                <td>{this.state.BusinessInfo.executiveSummary}</td>
              </tr>
              <tr>
                <td>Reason</td>
                <td>{this.state.BusinessInfo.reason}</td>
              </tr>
              <tr>
                <td>Business Option</td>
                <td>{this.state.BusinessInfo.businessOption}</td>
              </tr>
              <tr>
                <td>Benefit Timescale</td>
                <td>{this.state.BusinessInfo.benefitTimescale}</td>
              </tr>
              <tr>
                <td>Negative Impact</td>
                <td>{this.state.BusinessInfo.negativeImpact}</td>
              </tr>
              <tr>
                <td>Customer Impact And Engagement</td>
                <td>{this.state.BusinessInfo.customerImpactAndEngagement}</td>
              </tr>
              <tr>
                <td>Major Risks</td>
                <td>{this.state.BusinessInfo.majorRisks}</td>
              </tr>
              <tr>
                <td>Diversity And Inclusion Considerations</td>
                <td>{this.state.BusinessInfo.diversityAndInclusionConsiderations}</td>
              </tr>
              <tr>
                <td>Investment Appraisal</td>
                <td>{this.state.BusinessInfo.investmentAppraisal}</td>
              </tr>
            </>
          )}
          {this.state.displayInfo === 'Question' && (
            this.questionMap()
          )}
          </tbody>
        </table>

        {/*------------------------------------------------------------------------------------------------------*/}
        {/* Accept project form to move project to active and assign manager and transformation lead */}
        <hr></hr>
        <div className={classes.Projects}>
          <h3>Accept project</h3><br/>
          <Form id="AcceptProjectForm" layout="vertical" onFinish={this.onSubmitAccept}>

            {/* ---------------------------------------------------------------------------------------------- */}
            {/* drop down to select the manager */}
            <FormItem
              label="Is the project a quick win?"
              extra="This will determine the size of the project"
              name="quickWin"
              rules={[
                {
                  required: true,
                  message: 'Please select an option'
                }
              ]}
            >

              {/* drop down mapped to management users */}
              <Select value={this.state.quickWin} onChange={this.onChangeQuickWin}>
                <Option key={'isQuickWin'} value={'isQuickWin'}>
                  {'Yes'}
                </Option>
                <Option key={'notQuickWin'} value={'notQuickWin'}>
                  {'No'}
                </Option>
              </Select>
            </FormItem>

            {/* ---------------------------------------------------------------------------------------------- */}
            {/* Input for the priority score */}
            <FormItem
              label="Project priority score"
              extra="This will determine priority of the project"
              name="Priority Score"
              rules={[
                {
                  required: true,
                  type: "number",
                  message: 'Please input a vaild number for the priority score'
                }
              ]}
            >
              <InputNumber value={this.state.priorityScore} onChange={this.onChangePriorityScore}/>
            </FormItem>

            {this.state.quickWin === "notQuickWin" && (
              <>
                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the benefit */}
                <FormItem
                  label="Project benefit"
                  name="benefit"
                >
                  <Input defaultValue={this.state.benefit} value={this.state.benefit} onChange={this.onChangeBenefit}/>
                </FormItem>

                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the cost */}
                <FormItem
                  label="Estimate Cost"
                  name="estimateCost"
                >
                  <Input defaultValue={this.state.estimatedCost} value={this.state.estimatedCost} onChange={this.onChangeEstimatedCost}/>
                </FormItem>

                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the sponsor */}
                <FormItem
                  label="Sponsor"
                  name="sponsor"
                >
                  <Input defaultValue={this.state.sponsor} value={this.state.sponsor} onChange={this.onChangeSponsor}/>
                </FormItem>

                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the executive summary */}
                <FormItem
                  label="Executive Summary"
                  name="executiveSummary"
                >
                  <Input defaultValue={this.state.executiveSummary} value={this.state.executiveSummary} onChange={this.onChangeExecutiveSummary}/>
                </FormItem>

                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the reason */}
                <FormItem
                  label="Reason"
                  name="reason"
                >
                  <Input defaultValue={this.state.reason} value={this.state.reason} onChange={this.onChangeReason}/>
                </FormItem>

                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the reason */}
                <FormItem
                  label="End date"
                  name="duration"
                >
                  <DatePicker
                    selected={this.state.duration}
                    onChange={this.onChangeDuration}
                  />
                </FormItem>

                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the business option */}
                <FormItem
                  label="Business Option"
                  name="businessOption"
                >
                  <Input defaultValue={this.state.businessOption} value={this.state.businessOption} onChange={this.onChangeBusinessOption}/>
                </FormItem>

                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the benefit timescale */}
                <FormItem
                  label="Benefit Timescale"
                  name="benefitTimescale"
                >
                  <Input defaultValue={this.state.benefitTimescale} value={this.state.benefitTimescale} onChange={this.onChangeBenefitTimescale}/>
                </FormItem>

                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the negative impact */}
                <FormItem
                  label="Negative Impact"
                  name="negativeImpact"
                >
                  <Input defaultValue={this.state.negativeImpact} value={this.state.negativeImpact} onChange={this.onChangeNegativeImpact}/>
                </FormItem>

                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the customer impact */}
                <FormItem
                  label="Customer Impact and Engagement"
                  name="customerImpact"
                >
                  <Input defaultValue={this.state.customerImpact} value={this.state.customerImpact} onChange={this.onChangeCustomerImpact}/>
                </FormItem>

                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the risks */}
                <FormItem
                  label="Major Risks"
                  name="majorRisks"
                >
                  <Input defaultValue={this.state.majorRisks} value={this.state.majorRisks} onChange={this.onChangeMajorRisks}/>
                </FormItem>

                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the diversity and inclusion */}
                <FormItem
                  label="Diversity and inclusion considerations"
                  name="diversityAndInclusion"
                >
                  <Input defaultValue={this.state.diversityAndInclusion} value={this.state.diversityAndInclusion} onChange={this.onChangeDiversityAndInclusion}/>
                </FormItem>

                {/* ---------------------------------------------------------------------------------------------- */}
                {/* Input for the investment appraisal */}
                <FormItem
                  label="Investment Appraisal"
                  name="investmentAppraisal"
                >
                  {/* drop down mapped to management users */}
                  <Input defaultValue={this.state.investmentAppraisal} value={this.state.investmentAppraisal} onChange={this.onChangeInvestmentAppraisal}/>
                </FormItem>
              </>
            )}

            {/* ------------------------------------------------------------------------------------------------ */}
            {/* Button to submit the sccept form */}
            <FormItem>
              <Button key="submit" type="primary" form="AcceptProjectForm" style={{ background: 'LawnGreen' }}
                      htmlType="submit" className={classes.floatRightSearch}>
                {'Accept Project'}
              </Button>
            </FormItem>
          </Form>
        </div>

        {/*------------------------------------------------------------------------------------------------------*/}
        {/* Reject project form to move project to reject and add notes */}
        <hr></hr>
        <div className={classes.Projects}>
          <h3>Reject project</h3><br/>
          <Form id="RejectProjectForm" layout="vertical" onFinish={this.onSubmitReject}>

            {/*------------------------------------------------------------------------------------------------------*/}
            {/* Text input for reason for rejection */}
            <FormItem
              label="Reason for rejection"
              extra="Give the submitter a reason their project was rejected"
              name="Reason for rejection"
              rules={[
                {
                  required: true,
                  message: 'Please write a reason for rejection'
                }
              ]}
            ><Input value={this.state.questions} onChange={this.onChangeQuestions}/>
            </FormItem>

            {/* ------------------------------------------------------------------------------------------------ */}
            {/* Button to submit the rejection form */}
            <FormItem>
              <Button key="submit" type="primary" style={{ background: 'red' }} form="RejectProjectForm"
                      htmlType="submit" className={classes.floatRightSearch}>
                {'Reject Project'}
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addUserToProject: (listOfUserId, projectId) =>
      dispatch(actions.addUserToProject(listOfUserId, projectId))
  };
};
export default connect(null, mapDispatchToProps)(AdminProjectReview);
