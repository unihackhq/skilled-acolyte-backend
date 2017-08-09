const Joi = require('joi');

exports.payload = {
  name: Joi.string(),
  location: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  timezone: Joi.string().allow(null),
  eventbriteId: Joi.string().allow(null),
  eventbriteLink: Joi.string().uri().allow(null),
  logoUrl: Joi.string().uri().allow(null)
};
