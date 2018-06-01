const _ = require('lodash');
const Joi = require('joi');

// payload is a function because we need two clones of payload (for required and non required)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  name: Joi.string(),
  shortDescription: Joi.string(),
  devpostLink: Joi.string().uri().allow(null),
  stack: Joi.string().allow(null),
  longDescription: Joi.string().allow(null),
  eventId: Joi.string().uuid(),
  photoUrl: Joi.string().uri().allow(null),
});

const requiredValues = _.mapValues(
  _.pick(payload(), ['name', 'shortDescription', 'eventId']),
  value => value.required()
);

exports.payload = payload();
exports.requiredPayload = _.assign(payload(), requiredValues);
