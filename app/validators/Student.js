const Joi = require('joi');

exports.payload = {
  id: Joi.string().required().error(
    new Error('Id is required.')
  ),
  university: Joi.string().required().error(
    new Error('University is required.')
  ),
  studyLevel: Joi.string(),
  degree: Joi.string(),
  dietaryReq: Joi.string(),
  medicalReq: Joi.string(),
  shirtSize: Joi.string(),
  photoUrl: Joi.string().uri()
};
