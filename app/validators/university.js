const _ = require('lodash');
const Joi = require('joi');

const payload = {
  id: Joi.string().guid({ version: 'uuidv4' }),
  name: Joi.string(),
  country: Joi.string().default('Australia')
};

const requiredValues = _.mapValues(
  _.pick(payload, ['name']),
  value => value.required()
);

exports.payload = payload;
exports.requiredPayload = _.assign(payload, requiredValues);
