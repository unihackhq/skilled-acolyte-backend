const Joi = require('joi');
const util = require('../util/validator');

// payload is a function because we need two clones of payload (for required and optional)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  name: Joi.string(),
  description: Joi.string(),
  type: Joi.string().valid('session', 'techTalk', 'mealsRafflesEtc', 'event'),
  location: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  eventId: Joi.string().guid({ version: 'uuidv4' }),
});

const requiredKeys = [
  'name',
  'type',
  'description',
  'location',
  'startDate',
  'endDate',
  'eventId'
];

exports.payload = util.optional(payload(), requiredKeys);
exports.requiredPayload = util.required(payload(), requiredKeys);
