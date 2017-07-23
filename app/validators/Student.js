const Joi = require('joi');

exports.payload = {
  id: Joi.string(),
  university: Joi.string().guid({ version: 'uuidv4' }),
  studyLevel: Joi.string(),
  degree: Joi.string(),
  dietaryReq: Joi.string(),
  medicalReq: Joi.string(),
  shirtSize: Joi.string(),
  photoUrl: Joi.string().uri(),
};
