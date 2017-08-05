const Joi = require('joi');

exports.payload = {
  id: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  preferredName: Joi.string(),
  email: Joi.string().email(),
  dateOfBirth: Joi.date(),
  gender: Joi.string(),
  mobile: Joi.number(),
  authId: Joi.number(),
  accessToken: Joi.string().token(),
  deactivated: Joi.boolean(),
};
