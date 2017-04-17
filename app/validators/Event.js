const Joi = require('joi');

exports.payload = {
  name: Joi.string().required().error(new Error('Name is required')),
  startDate: Joi.date().error(new Error('startDate needs to be in dateform')),
  endDate: Joi.date().error(new Error('endDate needs to be in dateform')),
  eventbriteLink: Joi.string().uri(),
  location: Joi.string(),
  logoUrl: Joi.string().uri(),
};
