const Boom = require('boom');

function ErrorTemplate(errorName, errorCode, message) {
  this.errorName = errorName;
  this.errorCode = errorCode;
  this.message = message;
}

ErrorTemplate.prototype = Error.prototype;

const NOT_FOUND_ERROR_NAME = 'notFoundError';
const INVALID_ERROR_NAME = 'invalidError';

const isNotFoundError = err => err && err.errorName === NOT_FOUND_ERROR_NAME;
const isInvalidError = err => err && err.errorName === INVALID_ERROR_NAME;

// Define Not Found Errors
exports.notFound = {
  modelNotFound: (modelName = 'object') => {
    return new ErrorTemplate(NOT_FOUND_ERROR_NAME, '10001', `Could not find requested ${modelName}`);
  },
};

// Define Invalid Errors
exports.invalid = {
  failedToCreate: (modelName = 'object') => {
    return new ErrorTemplate(INVALID_ERROR_NAME, 20001, `Failed to create ${modelName}`);
  },
  failedToUpdate: (modelName = 'object') => {
    return new ErrorTemplate(INVALID_ERROR_NAME, 20002, `Failed to update ${modelName}`);
  },
  failedToDelete: (modelName = 'object') => {
    return new ErrorTemplate(INVALID_ERROR_NAME, 20003, `Failed to delete ${modelName}`);
  },
  duplicateInvite: () => {
    return new ErrorTemplate(INVALID_ERROR_NAME, 20004, 'User has already been invited to the team');
  },
};

// Define Error Handler
exports.handler = (err) => {
  if (isNotFoundError(err)) {
    const boomErr = Boom.notFound(err.message);
    boomErr.output.payload.errorCode = err.errorCode;
    return boomErr;
  } else if (isInvalidError(err)) {
    const boomErr = Boom.badRequest(err.message);
    boomErr.output.payload.errorCode = err.errorCode;
    return boomErr;
  }

  return Boom.badImplementation(err.message);
};
