import React, { useState, useEffect } from 'react';
import { backendUrl } from '../../store/utility';
import classes from './../Projects/Projects.module.css';
const BusinessCase = props => {
  const [id, setId] = useState('');
  const [businessCases, setBusinessCase] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let infoId = props.match.params.id;
    setId(infoId);
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
  }, []);

  console.log(businessCases);

  return (
    <div className={classes.Projects}>
      <h1>All Business Case </h1>
      <table className={classes.Table}>
        <thead>
          <tr>
            <th>Benefit</th>
            <th>Benefit Timescale</th>
            <th>Business Option</th>
            <th>Costomer Impact And Engagement</th>
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
