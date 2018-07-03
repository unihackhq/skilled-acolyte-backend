const _ = require('lodash');
const Joi = require('joi');

// payload is a function because we need two clones of payload (for required and non required)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  name: Joi.string(),
  path: Joi.string(),
  content: Joi.string(),
  eventId: Joi.string().guid({ version: 'uuidv4' }),
});

const requiredValues = _.mapValues(
  _.pick(payload(), ['name', 'path', 'content', 'eventId']),
  value => value.required()
);

exports.payload = payload();
exports.requiredPayload = _.assign(payload(), requiredValues);
