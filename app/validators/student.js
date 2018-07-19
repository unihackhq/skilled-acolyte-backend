const Joi = require('joi');
const validators = require('./');
const util = require('../util/validator');

// payload is a function because we need two clones of payload (for required and optional)
const payload = () => ({
  id: Joi.string().guid({ version: 'uuidv4' }),
  universityId: Joi.string().guid({ version: 'uuidv4' }),
  studyLevel: Joi.string(),
  degree: Joi.string(),
  photoUrl: Joi.string().uri(),
});

const requiredKeys = ['universityId', 'studyLevel', 'degree'];

const optional = util.optional(payload(), requiredKeys);
exports.payload = Object.assign(optional, {
  user: Joi.object().keys(validators.user.payload),
  tickets: Joi.array().items(
    Joi.object().keys(validators.ticket.payload),
  ),
});

const required = util.required(payload(), requiredKeys);
exports.requiredPayload = Object.assign(required, {
  user: Joi.object().keys(validators.user.requiredPayload),
  tickets: Joi.array().items(
    Joi.object().keys(validators.ticket.requiredPayload),
  ),
});
