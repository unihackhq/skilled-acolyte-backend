const Joi = require('joi');
const { maybeRequired } = require('../util/validators');

exports.payload = (isReq) => {
  const req = maybeRequired(isReq);
  return {
    id: Joi.string().guid({ version: 'uuidv4' }),
    name: req(Joi.string()),
    description: req(Joi.string()),
    photoUrl: Joi.string().uri().allow(null),
    eventId: req(Joi.string().uuid())
  };
};
