const Joi = require('joi');
const util = require('../util/validator');

// payload is a function because we need two clones of payload (for required and optional)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  firstName: Joi.string(),
  lastName: Joi.string(),
  preferredName: Joi.string(),
  email: Joi.string().email(),
  dateOfBirth: Joi.date().iso(),
  gender: Joi.string(),
  mobile: Joi.string(),
});

const requiredKeys = [
  'firstName',
  'lastName',
  'preferredName',
  'email',
  'dateOfBirth',
  'gender',
  'mobile'
];

exports.payload = util.optional(payload(), requiredKeys);
exports.requiredPayload = util.required(payload(), requiredKeys);
