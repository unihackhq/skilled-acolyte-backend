const Boom = require('boom');
const { ValidationError } = require('sequelize');

exports.preResponse = (req, h) => {
  const { response } = req;

  // handle sequelize validation error
  if (response instanceof ValidationError) {
    const { table, detail } = response.parent;

    const error = Boom.badRequest('Data validation failed', response);
    error.output.payload.details = { table, detail };

    // log original error and return
    req.log('sequelize-error', response);
    return error;
  }

  return h.continue;
};
