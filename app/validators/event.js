const _ = require('lodash');
const Joi = require('joi');

// payload is a function because we need two clones of payload (for required and non required)
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

const requiredValues = _.mapValues(
  _.pick(payload(), [
    'name',
    'location',
    'startDate',
    'endDate',
    'handbookUrl',
    'sponsors',
    'prizes',
    'judges'
  ]),
  value => value.required()
);

exports.payload = payload();
exports.requiredPayload = _.assign(payload(), requiredValues);
