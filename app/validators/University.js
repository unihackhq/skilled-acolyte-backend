const Joi = require('joi');
const maybeRequired = require('../util/validators').maybeRequired;

exports.payload = (isReq) => {
  const req = maybeRequired(isReq);
  return {
    id: Joi.string().guid({ version: 'uuidv4' }),
    name: req(Joi.string()),
    country: Joi.string().default('Australia')
  };
};
