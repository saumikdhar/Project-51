const BusinessCase = require('../models/business-case');
const { body } = require('express-validator');

exports.addBusinessCase = async (req, res, next) => {
  const newBusinessCase = req.body.newBusinessCase;
  const projectId = req.params.id;

  const businessCase = await BusinessCase.findOne({ where: { projectId: projectId } });
  if (businessCase) {
    const error = new Error('Business Case already exists');
    error.statusCode = 409;
    throw error;
  }
  try {
    await BusinessCase.create({
      benefit: newBusinessCase.benefit,
      estimatedCost: newBusinessCase.estimatedCost,
      sponsor: newBusinessCase.sponsor,
      executiveSummary: newBusinessCase.executiveSummary,
      reason: newBusinessCase.reason,
      businessOption: newBusinessCase.businessOption,
      duration: newBusinessCase.duration,
      benefitTimescale: newBusinessCase.benefitTimescale,
      negativeImpact: newBusinessCase.negativeImpact,
      customerImpactAndEngagement: newBusinessCase.customerImpactAndEngagement,
      majorRisks: newBusinessCase.majorRisks,
      diversityAndInclusionConsiderations: newBusinessCase.diversityAndInclusionConsiderations,
      investmentAppraisal: newBusinessCase.investmentAppraisal
    }).then(result => {
      res.status(200).json({ message: 'Successfully created the business case' });
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      console.log('error adding business case in backend');
    }
    next(error);
    res.status(500).json({ message: error.message });
    console.log('error adding business case in backend');
  }
};

// Retrieve all Business cases from the database.
exports.findAll = (req, res) => {};

// Find a single Business cases with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  BusinessCase.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Business case' + id
      });
    });
};

// Update a Business cases by the id in the request
exports.updateBusinessCase = async (req, res, next) => {
  const id = req.params.id;
  const benefit = req.body.benefit;
  const estimatedCost = req.body.estimatedCost;
  const sponsor = req.body.sponsor;
  const executiveSummary = req.body.executiveSummary;
  const reason = req.body.reason;
  const businessOption = req.body.businessOption;
  const duration = req.body.duration;
  const benefitTimescale = req.body.benefitTimescale;
  const negativeImpact = req.body.negativeImpact;
  const customerImpactAndEngagement = req.body.customerImpactAndEngagement;
  const majorRisks = req.body.majorRisks;
  const diversityAndInclusionConsiderations = req.body.diversityAndInclusionConsideration;
  const investmentAppraisal = req.body.investmentAppraisal;

  try {
    console.log('ID: ', id);
    const businessCase = await BusinessCase.findOne({ where: { id: id } });

    if (businessCase == null) {
      const error = new Error('Business Case does not exist');
      error.statusCode = 400;
      throw error;
    }
    console.log('Business Case is trying to update in backend');

    await BusinessCase.update(
      {
        benefit: benefit,
        estimatedCost: estimatedCost,
        sponsor: sponsor,
        executiveSummary: executiveSummary,
        reason: reason,
        businessOption: businessOption,
        duration: duration,
        benefitTimescale: benefitTimescale,
        negativeImpact: negativeImpact,
        customerImpactAndEngagement: customerImpactAndEngagement,
        majorRisks: majorRisks,
        diversityAndInclusionConsiderations: diversityAndInclusionConsiderations,
        investmentAppraisal: investmentAppraisal
      },
      { where: { id: id } }
    );
    console.log('editing of business case is occuring in backend');

    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log('this is an errrrroorrrrrrrr', error);
    if (!error.statusCode) {
      error.statusCode = 500;
      console.log('error occured when editing businesscase');
    }
    console.log('error in backend for editing businesscase');
    res.status(error.statusCode).json({ error: error });
  }
};

// Delete a Business cases with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  BusinessCase.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Business case was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Business case with id=${id}.
           Maybe Business case was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Business case with id=' + id
      });
    });
};

// Delete all Business cases from the database.
exports.deleteAll = (req, res) => {};
