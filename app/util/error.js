const Boom = require('boom');
const _ = require('lodash');
const {
  ValidationError,
  ForeignKeyConstraintError,
  ExclusionConstraintError,
  UnknownConstraintError,
} = require('sequelize');

exports.preResponse = (req, h) => {
  const { response } = req;

  // handle unknown validation error and other constraint errors
  if (response instanceof ValidationError ||
    response instanceof ExclusionConstraintError ||
    response instanceof UnknownConstraintError ||
    response instanceof ForeignKeyConstraintError) {
    const { table, detail } = response.parent;

    const error = Boom.conflict('Data failed validation', response);
    error.output.payload.details = { table, detail };
    if (response.errors) {
      error.output.payload.details.errors =
        response.errors.map(e => _.pick(e, ['message', 'type', 'path', 'value']));
    }


    // log original error and return
    req.log('sequelize-error', response);
    return error;
  }

  return h.continue;
};
