const User = require('../models').User;
const Error = require('../errors');
const Response = require('../responses');

const MODEL_NAME = 'user';

exports.listAll = (callback) => {
  User.findAll()
    .then(results => callback(null, results))
    .catch(error => callback(error));
};

exports.getUser = (id, callback) => {
  User.findById(id)
    .then((result) => {
      if (!result) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return callback(null, result);
    })
    .catch(error => callback(error));
};

exports.createUser = (payload, callback) => {
  User.create(payload)
    .then(result => callback(null, result))
    .catch(() => callback(Error.invalid.failedToCreate(MODEL_NAME)));
};

exports.updateUser = (id, payload, callback) => {
  User.findById(id)
    .then((user) => {
      if (!user) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return user.updateAttributes(payload)
        .then((result) => { callback(null, result); });
    })
    .catch(error => callback(error));
};

exports.deleteUser = (id, callback) => {
  User.findById(id)
    .then((user) => {
      if (!user) return callback(Error.notFound.modelNotFound(MODEL_NAME));

      // Soft delete
      return user.updateAttributes({ deactivated: true })
        .then((result) => {
          if (!result) return callback(Error.invalid.failedToDelete(MODEL_NAME));
          return callback(null, Response.successDelete(MODEL_NAME));
        });
    })
    .catch(error => callback(error));
};
