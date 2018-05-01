const Joi = require('joi');
const userValidator = require('./user');

const payload = {
  id: Joi.string().guid({ version: 'uuidv4' }),
  university: Joi.string().guid({ version: 'uuidv4' }).allow(null),
  studyLevel: Joi.string().allow(null),
  degree: Joi.string().allow(null),
  dietaryReq: Joi.string().allow(null),
  medicalReq: Joi.string().allow(null),
  shirtSize: Joi.string().allow(null),
  photoUrl: Joi.string().uri().allow(null)
};

exports.payload = {
  ...payload,
  user: Joi.object().keys(userValidator.payload),
};

exports.requiredPayload = {
  ...payload,
  user: Joi.object().keys(userValidator.requiredPayload),
};
