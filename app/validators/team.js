const _ = require('lodash');
const Joi = require('joi');

// payload is a function because we need two clones of payload (for required and non required)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  name: Joi.string(),
  description: Joi.string(),
  eventId: Joi.string().uuid(),
  photoUrl: Joi.string().uri().allow(null),
});

const requiredValues = _.mapValues(
  _.pick(payload(), ['name', 'description', 'eventId']),
  value => value.required()
);

exports.payload = payload();
exports.requiredPayload = _.assign(payload(), requiredValues);
