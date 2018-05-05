const Joi = require('joi');
const {
  user: userValidator,
  ticket: ticketValidator,
} = require('./');

const payload = {
  id: Joi.string().guid({ version: 'uuidv4' }),
  university: Joi.string().guid({ version: 'uuidv4' }),
  studyLevel: Joi.string(),
  degree: Joi.string(),
  dietaryReq: Joi.string(),
  medicalReq: Joi.string(),
  shirtSize: Joi.string(),
  photoUrl: Joi.string().uri(),
};

exports.payload = {
  ...payload,
  user: Joi.object().keys(userValidator.payload),
  ticket: Joi.object().keys(ticketValidator.payload),
};

const ticket = Joi.object().keys(ticketValidator.requiredPayload);
exports.requiredPayload = {
  ...payload,
  user: Joi.object().keys(userValidator.requiredPayload),
  tickets: Joi.array().items(ticket),
};
