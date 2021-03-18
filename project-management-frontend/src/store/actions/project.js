import axios from '../../Axios/axios';

const _addProject = project => ({
  type: 'ADD_PROJECT',
  project
});

export const addProject = (
  projectData = {
    name: '',
    managerName: '',
    projectStatus: '',
    quickWin: '',
    projectType: '',
    questions: ''
  }
) => {
  return dispatch => {
    const project = {
      name: projectData.name,
      managerName: projectData.managerName,
      projectStatus: projectData.projectStatus,
      quickWin: projectData.quickWin,
      projectType: projectData.projectType,
      questions: projectData.questions

      // benefit: businessCaseData.benefit,
      // estimatedCost:businessCaseData.estimatedCost,
      // sponsor: businessCaseData.sponsor,
      // executiveSummary: businessCaseData.executiveSummary,
      // reason: businessCaseData.reason,
      // businessOption: businessCaseData.businessOption,
      // duration: businessCaseData.duration,
      // benefitTimescale: businessCaseData.benefitTimescale,
      // negativeImpact: businessCaseData.negativeImpact,
      // customerImpactAndEngagement: businessCaseData.customerImpactAndEngagement,
      // majorRisks: businessCaseData.majorRisks,
      // diversityAndInclusionConsiderations: businessCaseData.diversityAndInclusionConsiderations,
      // investmentAppraisal: businessCaseData.investmentAppraisal
    };

    return axios.post('/createProject', project).then(result => {
      dispatch(_addProject(result.data));
    });
  };
};
