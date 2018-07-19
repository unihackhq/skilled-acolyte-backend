const Joi = require('joi');
const util = require('../util/validator');

// payload is a function because we need two clones of payload (for required and optional)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  name: Joi.string(),
  country: Joi.string().default('Australia')
});

const requiredKeys = ['name'];

exports.payload = util.optional(payload(), requiredKeys);
exports.requiredPayload = util.required(payload(), requiredKeys);
