const Event = require('../models').Event;
const Errors = require('../errors');

const MODEL_NAME = 'event';

exports.listAll = (callback) => {
  Event.findAll()
    .then(results => callback(null, results))
    .catch(error => callback(error));
};

exports.getEvent = (id, callback) => {
  Event.findById(id)
    .then((result) => {
      if (!result) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return callback(null, result);
    })
    .catch(error => callback(error));
};

exports.createEvent = (payload, callback) => {
  Event.create(payload)
    .then(result => callback(null, result))
    .catch(() => callback(Errors.invalid.failedToCreate(MODEL_NAME)));
};

exports.updateEvent = (id, payload, callback) => {
  Event.findById(id)
    .then((result) => {
      if (!result) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return result.updateAttributes(payload)
        .then((update) => { callback(null, update); });
    })
    .catch(error => callback(error));
};

exports.deleteEvent = (id, callback) => {
  Event.findById(id)
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
