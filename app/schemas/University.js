const Joi = require('joi');

module.exports = {
  name: Joi.string().required()
    .label('University Name')
    .error(new Error('University Name is required.')),
  country: Joi.string().default('Australia'),
};
