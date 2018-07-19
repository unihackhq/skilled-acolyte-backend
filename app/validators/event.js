const Joi = require('joi');
const util = require('../util/validator');

// payload is a function because we need two clones of payload (for required and optional)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  name: Joi.string(),
  location: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  eventbriteId: Joi.string(),
  handbookUrl: Joi.string().uri(),
  logoColor: Joi.string(),
  sponsors: Joi.object().keys({
    summary: Joi.string(),
    url: Joi.string().uri(),
  }),
  prizes: Joi.object().keys({
    summary: Joi.string(),
    url: Joi.string().uri(),
  }),
  judges: Joi.object().keys({
    summary: Joi.string(),
    url: Joi.string().uri(),
  }),
});

const requiredKeys = [
  'name',
  'location',
  'startDate',
  'endDate',
  'handbookUrl',
  'sponsors',
  'prizes',
  'judges',
];

exports.payload = util.optional(payload(), requiredKeys);
exports.requiredPayload = util.required(payload(), requiredKeys);
