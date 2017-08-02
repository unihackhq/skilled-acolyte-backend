const User = require('../models').User;
const Errors = require('../errors');

const MODEL_NAME = 'user';

exports.listAll = (callback) => {
  User.findAll()
    .then(results => callback(null, results))
    .catch(error => callback(error));
};

exports.getUser = (id, callback) => {
  User.findById(id)
    .then((result) => {
      if (!result) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return callback(null, result);
    })
    .catch(error => callback(error));
};

exports.createUser = (payload, callback) => {
  User.create(payload)
    .then(result => callback(null, result))
    .catch(() => callback(Errors.invalid.failedToCreate(MODEL_NAME)));
};

exports.updateUser = (id, payload, callback) => {
  User.findById(id)
    .then((user) => {
      if (!user) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return user.updateAttributes(payload)
        .then((result) => { callback(null, result); });
    })
    .catch(error => callback(error));
};

exports.deleteUser = (id, callback) => {
  User.findById(id)
    .then((user) => {
      if (!user) return callback(Errors.notFound.modelNotFound(MODEL_NAME));

      // Soft delete
      return user.updateAttributes({ deactivated: true })
        .then((result) => {
          if (!result) return callback(Errors.invalid.failedToDelete(MODEL_NAME));
          return callback(null, {
            status: 'SUCCESS',
            message: `Successfully deleted ${MODEL_NAME}`,
          });
        });
    })
    .catch(error => callback(error));
};
