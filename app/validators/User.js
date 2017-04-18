const Joi = require('joi');

exports.payload = {
  firstName: Joi.string(),
  lastName: Joi.string(),
  preferredName: Joi.string(),
  email: Joi.string().email(),
  dateOfBirth: Joi.date(),
  gender: Joi.string().uri(),
  mobile: Joi.number(),
  authId: Joi.number(),
  accessToken: Joi.string().token(),
  deactivated: Joi.boolean()
};
