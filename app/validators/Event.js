const Joi = require('joi');
const maybeRequired = require('../util/validators').maybeRequired;

exports.payload = (isReq) => {
  const req = maybeRequired(isReq);
  return {
    id: Joi.string().guid({ version: 'uuidv4' }),
    name: req(Joi.string()),
    location: req(Joi.string()),
    startDate: req(Joi.date()),
    endDate: req(Joi.date()),
    timezone: Joi.string().allow(null),
    eventbriteId: Joi.string().allow(null),
    eventbriteLink: Joi.string().uri().allow(null),
    logoUrl: Joi.string().uri().allow(null)
  };
};
