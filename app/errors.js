const Boom = require('boom');

function ErrorTemplate(errorName, errorCode, message) {
  this.errorName = errorName;
  this.errorCode = errorCode;
  this.message = message;
}

ErrorTemplate.prototype = Error.prototype;

// Define Not Found Errors

const NOT_FOUND_ERROR_NAME = 'notFoundError';
const isNotFoundError = err => err && err.errorName === NOT_FOUND_ERROR_NAME;

const modelNotFound = (modelName = 'object') => {
  const message = `Could not find requested ${modelName}`;
  return new ErrorTemplate(NOT_FOUND_ERROR_NAME, '10001', message);
};

exports.notFound = {
  modelNotFound,
};

// Define Internal Errors

const INTERNAL_ERROR_NAME = 'internalError';

const failedToCreate = (modelName = 'object') => {
  const message = `Failed to create ${modelName}`;
  return new ErrorTemplate(INTERNAL_ERROR_NAME, 20001, message);
};

const failedToUpdate = (modelName = 'object') => {
  const message = `Failed to update ${modelName}`;
  return new ErrorTemplate(INTERNAL_ERROR_NAME, 20002, message);
};

const failedToDelete = (modelName = 'object') => {
  const message = `Failed to create ${modelName}`;
  return new ErrorTemplate(INTERNAL_ERROR_NAME, 20003, message);
};

exports.internalError = {
  failedToCreate,
  failedToUpdate,
  failedToDelete,
};

exports.handler = (err) => {
  if (isNotFoundError(err)) {
    const boomErr = Boom.notFound(err.message);
    boomErr.output.payload.errorCode = err.errorCode;
    return boomErr;
  }

  return Boom.badImplementation(err.message || err);
};
