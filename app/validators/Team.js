const Joi = require('joi');

exports.payload = {
  name: Joi.string(),
  description: Joi.string(),
  photoUrl: Joi.string().uri(),
  eventId: Joi.string().uuid(),
};
