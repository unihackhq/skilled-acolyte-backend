const Joi = require('joi');
const UserSchema = require('./User').payload;

exports.payload = {
  id: Joi.string(),
  user: Joi.object().keys(UserSchema),
  university: Joi.string().guid({ version: 'uuidv4' }).allow(null),
  studyLevel: Joi.string().allow(null),
  degree: Joi.string().allow(null),
  dietaryReq: Joi.string().allow(null),
  medicalReq: Joi.string().allow(null),
  shirtSize: Joi.string().allow(null),
  photoUrl: Joi.string().uri().allow(null)
};
