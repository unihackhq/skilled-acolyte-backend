const Joi = require('joi');
const maybeRequired = require('../util/validators').maybeRequired;

exports.payload = (isReq) => {
  const req = maybeRequired(isReq);
  return {
    id: Joi.string().guid({ version: 'uuidv4' }),
    firstName: req(Joi.string()),
    lastName: req(Joi.string()),
    preferredName: req(Joi.string()),
    email: req(Joi.string().email()),
    dateOfBirth: req(Joi.date()),
    gender: req(Joi.string()),
    mobile: req(Joi.number())
  };
};
