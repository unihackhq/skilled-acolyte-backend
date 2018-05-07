const _ = require('lodash');
const Joi = require('joi');

// payload is a function because we need two clones of payload (for required and non required)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  eventbriteOrder: Joi.string(),
  ticketType: Joi.string(),
  cancelled: Joi.boolean(),
  trasferred: Joi.boolean(),
});

const requiredValues = _.mapValues(
  _.pick(payload(), ['eventbriteOrder', 'ticketType']),
  value => value.required()
);

exports.payload = payload();
exports.requiredPayload = _.assign(payload(), requiredValues);
