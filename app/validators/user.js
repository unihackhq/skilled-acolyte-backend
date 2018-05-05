const _ = require('lodash');
const Joi = require('joi');

// payload is a function because we need two clones of payload (for required and non required)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  firstName: Joi.string(),
  lastName: Joi.string(),
  preferredName: Joi.string(),
  email: Joi.string().email(),
  dateOfBirth: Joi.date(),
  gender: Joi.string(),
  mobile: Joi.number(),
});

const requiredValues = _.mapValues(
  _.pick(payload(), ['firstName', 'lastName', 'preferredName', 'email', 'dateOfBirth', 'gender', 'mobile']),
  value => value.required()
);

exports.payload = payload();
exports.requiredPayload = _.assign(payload(), requiredValues);
