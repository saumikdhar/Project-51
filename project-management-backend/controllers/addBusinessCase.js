const BusinessCase = require('../models/business-case');
const { body } = require('express-validator');

// Create and Save a new business Case
exports.createBusinessCase = (req, res, next) => {
  //validates request
  if (!req.body.title) {
    res.status(400).send({
      message: "Can't be empty"
    });
    return;
  }
  //creates a business case
  const businessCase = {
    benefit: req.body.benefit,
    estimatedCost: req.body.estimatedCost,
    sponsor: req.body.sponsor,
    executiveSummary: req.body.executiveSummary,
    reason: req.body.reason,
    businessOption: req.body.businessOption,
    duration: req.body.duration,
    benefitTimescale: req.body.benefitTimescale,
    negativeImpact: req.body.negativeImpact,
    customerImpactAndEngagement: req.body.customerImpactAndEngagement,
    majorRisks: req.body.majorRisks,
    diversityAndInclusionConsiderations: req.body.diversityAndInclusionConsiderations,
    investmentAppraisal: req.body.investmentAppraisal
  };
  BusinessCase.create(businessCase)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error occured while trying to add a business case'
      });
    });
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
exports.update = (req, res) => {
  const id = req.params.id;
  BusinessCase.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Business case was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update Business case with id=${id}. 
          Maybe Business case was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Business case with id=' + id
      });
    });
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
