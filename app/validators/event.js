const _ = require('lodash');
const Joi = require('joi');

// payload is a function because we need two clones of payload (for required and non required)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  name: Joi.string(),
  location: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  timezone: Joi.string().allow(null),
  eventbriteId: Joi.string().allow(null),
  eventbriteLink: Joi.string().uri().allow(null),
  logoUrl: Joi.string().uri().allow(null)
});

const requiredValues = _.mapValues(
  _.pick(payload(), ['name', 'location', 'startDate', 'endDate']),
  value => value.required()
);

exports.payload = payload();
exports.requiredPayload = _.assign(payload(), requiredValues);
