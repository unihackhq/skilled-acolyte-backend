const Joi = require('joi');

exports.uuid = {
  id: Joi.string().guid({ version: 'uuidv4' }).required()
    .error(new Error('Not a valid ID')),
};
