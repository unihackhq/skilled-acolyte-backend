const University = require('../models').University;
const Errors = require('../errors');

const MODEL_NAME = 'university';

exports.listAll = (callback) => {
  University.findAll()
    .then(results => callback(null, results))
    .catch(error => callback(error));
};

exports.getUniversity = (id, callback) => {
  University.findById(id)
    .then((result) => {
      if (!result) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return callback(null, result);
    })
    .catch(error => callback(error));
};

exports.createUniversity = (payload, callback) => {
  University.create(payload)
    .then(result => callback(null, result))
    .catch(() => callback(Errors.invalid.failedToCreate(MODEL_NAME)));
};

exports.updateUniversity = (id, payload, callback) => {
  University.findById(id)
    .then((result) => {
      if (!result) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return result.updateAttributes(payload)
        .then((update) => { callback(null, update); });
    })
    .catch(error => callback(error));
};

exports.deleteUniversity = (id, callback) => {
  University.findById(id)
    .then((result) => {
      if (!result) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return result.destroy({ where: { id } })
        .then((deleted) => {
          if (!deleted) return callback(Errors.invalid.failedToDelete(MODEL_NAME));
          return callback(null, {
            status: 'SUCCESS',
            message: `Successfully deleted ${MODEL_NAME}`,
          });
        });
    })
    .catch(error => callback(error));
};
