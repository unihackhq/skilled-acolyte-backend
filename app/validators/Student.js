const Joi = require('joi');

exports.payload = {
  id: Joi.string().required(),
  university: Joi.string().required(),
  studyLevel: Joi.string(),
  degree: Joi.string(),
  dietaryReq: Joi.string(),
  medicalReq: Joi.string(),
  shirtSize: Joi.string(),
  photoUrl: Joi.string().uri(),
};
