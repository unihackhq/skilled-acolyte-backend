const Joi = require('joi');

exports.payload = {
  name: Joi.string().required()
    .error(new Error('Name is required')),
  country: Joi.string().default('Australia'),
};
