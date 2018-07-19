const Joi = require('joi');
const util = require('../util/validator');

// payload is a function because we need two clones of payload (for required and optional)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  name: Joi.string(),
  shortDescription: Joi.string(),
  devpostLink: Joi.string().uri(),
  stack: Joi.string(),
  longDescription: Joi.string(),
  eventId: Joi.string().uuid(),
  photoUrl: Joi.string().uri(),
});

const requiredKeys = ['name', 'shortDescription', 'eventId'];

exports.payload = util.optional(payload(), requiredKeys);
exports.requiredPayload = util.required(payload(), requiredKeys);
