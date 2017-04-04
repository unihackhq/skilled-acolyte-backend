const Joi = require('joi');

exports.payload = {
  name: Joi.string().required()
    .label('University Name')
    .error(new Error('University Name is required.')),
  country: Joi.string().default('Australia'),
};
