const Joi = require('joi');

exports.payload = {
  name: Joi.string(),
  country: Joi.string().default('Australia')
};
