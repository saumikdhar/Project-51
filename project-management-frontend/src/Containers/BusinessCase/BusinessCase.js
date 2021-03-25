import React, { useState, useEffect } from 'react';
import { backendUrl } from '../../shared/utility';
import classes from './../Projects/Projects.module.css';
import classes1 from './BusinessCase.module.css';
import { Button, Modal, Form, Input } from 'antd';
import CustomButton from '../../Components/UI/Button/Button';
const BusinessCase = props => {
  const [businessCases, setBusinessCase] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const FormItem = Form.Item;

  const retrieveBusinessCases = () => {
    let infoId = props.match.params.id;
    const url = `${backendUrl()}/businessCase/getBusinessCase/` + infoId;
    const method = 'GET';
    const header = { 'Content-Type': 'application/json' };

    fetch(url, {
      method: method,
      headers: header
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Error');
        } else if (res.status !== 200 && res.status !== 201) {
          throw new Error('Error');
        }
        return res.json();
      })
      .then(resData => {
        setBusinessCase(resData.data);
        setIsLoaded(true);
      })
      .catch(error => {
        console.log('error occur', error);
      });
  };

  useEffect(() => {
    retrieveBusinessCases();
  }, []);

  const addBusinessCase = (routeType, values) => {
    let infoId = props.match.params.id;
    const url = `${backendUrl()}/businessCase/addBusinessCase/${infoId}`;
    const method = 'POST';
    const header = { 'Content-Type': 'application/json' };
    console.log(values);
    const newBusinessCase = {
      benefit: values.benefit,
      estimatedCost: values.estimatedCost,
      sponsor: values.sponsor,
      executiveSummary: values.executiveSummary,
      reason: values.reason,
      businessOption: values.businessOption,
      duration: values.duration,
      benefitTimescale: values.benefitTimescale,
      negativeImpact: values.negativeImpact,
      customerImpactAndEngagement: values.customerImpactAndEngagement,
      majorRisks: values.majorRisks,
      diversityAndInclusionConsiderations: values.diversityAndInclusionConsiderations,
      investmentAppraisal: values.investmentAppraisal
    };

    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify({ newBusinessCase: newBusinessCase })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Error');
        } else if (res.status !== 200 && res.status !== 201) {
          throw new Error("Couldn't add business case");
        }
        console.log('new Business case', newBusinessCase);
        return res.json();
      })
      .catch(error => {
        console.log('error has occured with adding business case');
      });
  };

  const updateBusinessCase = (routeType, values) => {
    let infoId = props.match.params.id;
    const url = `${backendUrl()}/businessCase/${routeType}/` + infoId;
    const method = 'POST';
    const header = { 'Content-Type': 'application/json' };

    fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify({
        benefit: values.benefit,
        estimatedCost: values.estimatedCost,
        sponsor: values.sponsor,
        executiveSummary: values.executiveSummary,
        reason: values.reason,
        businessOption: values.businessOption,
        duration: values.duration,
        benefitTimescale: values.benefitTimescale,
        negativeImpact: values.negativeImpact,
        customerImpactAndEngagement: values.customerImpactAndEngagement,
        majorRisks: values.majorRisks,
        diversityAndInclusionConsiderations: values.diversityAndInclusionConsiderations,
        investmentAppraisal: values.investmentAppraisal
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Error');
        } else if (res.status !== 200 && res.status !== 201) {
          throw new Error('Couldnt edit business case');
        }
        console.log('check business edit is working');
        retrieveBusinessCases();
        return res.json();
      })
      .catch(error => {
        console.log('error occurred', error);
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const submitBusinessCase = values => {
    setIsModalVisible(false);
    addBusinessCase('addBusinessCase', values);
  };

  const showModal2 = () => {
    setIsModalVisible2(true);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const submitUpdateBusinessCase = values => {
    setIsModalVisible2(false);
    updateBusinessCase('updateBusinessCase', values);
  };

  return (
    <div className={classes.Projects}>
      <CustomButton clicked={props.history.goBack} btnType="Back">
        &lt; Go back
      </CustomButton>
      <br />
      <br />
      <h1>All Business Case </h1>
      <Modal
        title="Add Business Case "
        onCancel={() => setIsModalVisible(false)}
        visible={isModalVisible}
        footer={[
          <Button key="Cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" form="AddBusinessCaseForm" htmlType="submit">
            {'Submit'}
          </Button>
        ]}
      >
        <Form id="AddBusinessCaseForm" layout="vertical" onFinish={submitBusinessCase}>
          <FormItem label="Benefit:" name="benefit">
            <Input placeholder="Benefit:" />
          </FormItem>
          <FormItem label="Benefit Timescale:" name="benefitTimescale">
            <Input placeholder="Benefit Timescale:" />
          </FormItem>
          <FormItem label="BusinessOption:" name="businessOption">
            <Input placeholder="BusinessOption: " />
          </FormItem>
          <FormItem label="Customer Impact And Engagement:" name="customerImpactAndEngagement">
            <Input placeholder="Customer Impact And Engagement:" />
          </FormItem>
          <FormItem
            label="Diversity And Inclusion Considerations:"
            name="diversityAndInclusionConsiderations"
          >
            <Input placeholder="Diversity And Inclusion Considerations:" />
          </FormItem>
          <FormItem label="Duration:" name="duration">
            <Input placeholder="Duration:" />
          </FormItem>
          <FormItem label="Estimated Cost:" name="estimatedCost">
            <Input placeholder="Estimated Cost:" />
          </FormItem>
          <FormItem label="Executive Summary:" name="executiveSummary">
            <Input placeholder="Executive Summary:" />
          </FormItem>
          <FormItem label="Investment Appraisal:" name="investmentAppraisal">
            <Input placeholder="Investment Appraisal:" />
          </FormItem>
          <FormItem label="Major Risks:" name="majorRisks">
            <Input placeholder="Major Risks:" />
          </FormItem>
          <FormItem label="Reason" name="reason">
            <Input placeholder="Reason:" />
          </FormItem>
          <FormItem label="Sponsor:" name="sponsor">
            <Input placeholder="Sponsor:" />
          </FormItem>
        </Form>
      </Modal>
      <button onClick={() => showModal()}>Add Business Case</button>
      &nbsp;&nbsp;&nbsp;
      <button className={classes1.button1} onClick={() => showModal2()}>
        {' '}
        Edit Business Case
      </button>
      <Modal
        title="Edit business case "
        visible={isModalVisible2}
        onCancel={handleCancel2}
        footer={[
          <Button key="Cancel" onClick={() => handleCancel2()}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" form="EditBusinessCaseForm" htmlType="submit">
            Submit
          </Button>
        ]}
      >
        <Form id="EditBusinessCaseForm" layout="vertical" onFinish={submitUpdateBusinessCase}>
          <FormItem initialValue={businessCases?.benefit} label="Benefit" name="benefit">
            <Input placeholder="Benefit" />
          </FormItem>
          <FormItem
            initialValue={businessCases?.benefitTimescale}
            label="Benefit Timescale:"
            name="benefitTimescale"
          >
            <Input placeholder="BenefitTimescale" />
          </FormItem>
          <FormItem
            initialValue={businessCases?.businessOption}
            label="Business Option:"
            name="businessOption"
          >
            <Input placeholder="BusinessOption" />
          </FormItem>
          <FormItem
            initialValue={businessCases?.customerImpactAndEngagement}
            label="customer Impact And Engagement:"
            name="customerImpactAndEngagement"
          >
            <Input placeholder="CustomerImpactAndEngagement" />
          </FormItem>
          <FormItem
            initialValue={businessCases?.diversityAndInclusionConsiderations}
            label="Diversity And Inclusion Considerations:"
            name="diversityAndInclusionConsiderations"
          >
            <Input placeholder="DiversityAndInclusionConsiderations" />
          </FormItem>
          <FormItem initialValue={businessCases?.duration} label="Duration:" name="duration">
            <Input placeholder="Duration" />
          </FormItem>
          <FormItem
            initialValue={businessCases?.estimatedCost}
            label="Estimated Cost:"
            name="estimatedCost"
          >
            <Input placeholder="EstimatedCost" />
          </FormItem>
          <FormItem
            initialValue={businessCases?.executiveSummary}
            label="Executive Summary:"
            name="executiveSummary"
          >
            <Input placeholder="ExecutiveSummary" />
          </FormItem>
          <FormItem
            initialValue={businessCases?.investmentAppraisal}
            label="Investment Appraisal:"
            name="investmentAppraisal"
          >
            <Input placeholder="InvestmentAppraisal" />
          </FormItem>
          <FormItem initialValue={businessCases?.majorRisks} label="Major Risks:" name="majorRisks">
            <Input placeholder="MajorRisks" />
          </FormItem>
          <FormItem initialValue={businessCases?.reason} label="Reason:" name="reason">
            <Input placeholder="Reason" />
          </FormItem>
          <FormItem initialValue={businessCases?.sponsor} label="Sponsor:" name="sponsor">
            <Input placeholder="Sponsor" />
          </FormItem>
        </Form>
      </Modal>
      <br></br>
      <br></br>
      <table className={classes.Table}>
        <thead>
          <tr>
            <th>Benefit</th>
            <th>Benefit Timescale</th>
            <th>Business Option</th>
            <th>Customer Impact And Engagement</th>
            <th>Diversity And Inclusion Considerations </th>
            <th>Duration</th>
            <th>Estimated Cost</th>
            <th>Executive Summary</th>
            <th>Investment Appraisal</th>
            <th>Major Risks</th>
            <th>Negative Impact</th>
            <th>Reason</th>
            <th>Sponsor</th>
          </tr>
        </thead>
        <tbody>
          {isLoaded ? (
            businessCases.map(businessCase => {
              return (
                <tr key={businessCase.id}>
                  <td>{businessCase.benefit}</td>
                  <td>{businessCase.benefitTimescale}</td>
                  <td>{businessCase.businessOption}</td>
                  <td>{businessCase.customerImpactAndEngagement}</td>
                  <td>{businessCase.diversityAndInclusionConsiderations}</td>
                  <td>{businessCase.duration}</td>
                  <td>{businessCase.estimatedCost}</td>
                  <td>{businessCase.executiveSummary}</td>
                  <td>{businessCase.investmentAppraisal}</td>
                  <td>{businessCase.majorRisks}</td>
                  <td>{businessCase.negativeImpact}</td>
                  <td>{businessCase.reason}</td>
                  <td>{businessCase.sponsor}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">Loading</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default BusinessCase;
