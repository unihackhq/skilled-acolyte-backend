const Joi = require('joi');
const UserSchema = require('./User').payload;

exports.payload = {
  id: Joi.string(),
  user: Joi.object().keys(UserSchema),
  university: Joi.string().guid({ version: 'uuidv4' }),
  studyLevel: Joi.string(),
  degree: Joi.string(),
  dietaryReq: Joi.string(),
  medicalReq: Joi.string(),
  shirtSize: Joi.string(),
  photoUrl: Joi.string().uri(),
};
