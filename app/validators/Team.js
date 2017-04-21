const Joi = require('joi');

exports.payload = {
  name: Joi.string().required().error(new Error('name is required.')),
  description: Joi.string(),
  photoUrl: Joi.string().uri(),
  EventId: Joi.string().uuid().required().error(new Error('EventId is required.')),
};
