const Joi = require('joi');

exports.payload = {
  name: Joi.string().required(),
  country: Joi.string().default('Australia'),
};
