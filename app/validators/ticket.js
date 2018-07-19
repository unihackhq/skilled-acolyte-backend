const Joi = require('joi');
const util = require('../util/validator');

// payload is a function because we need two clones of payload (for required and optional)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  eventbriteOrder: Joi.string(),
  eventId: Joi.string().guid({ version: 'uuidv4' }),
  ticketType: Joi.string(),
  cancelled: Joi.boolean(),
  trasferred: Joi.boolean(),
});

const requiredKeys = ['eventbriteOrder', 'eventId', 'ticketType'];

exports.payload = util.optional(payload(), requiredKeys);
exports.requiredPayload = util.required(payload(), requiredKeys);
