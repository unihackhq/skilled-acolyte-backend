const Student = require('../models').Student;
const Error = require('../errors');
const Response = require('../responses');

const MODEL_NAME = 'student';

exports.listAll = (callback) => {
  Student.findAll()
    .then(result => callback(null, result))
    .catch(error => callback(error));
};

exports.listAll = (callback) => {
  Student.findAll()
    .then(results => callback(null, results))
    .catch(error => callback(error));
};

exports.getStudent = (id, callback) => {
  Student.findbyId(id)
    .then((result) => {
      if (!result) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return callback(null, result);
    })
    .catch(error => callback(error));
};

exports.createStudent = (payload, callback) => {
  Student.create(payload)
    .then(result => callback(null, result))
    .catch(() => callback(Error.internalError.failedToCreate(MODEL_NAME)));
};

exports.updateStudent = (id, payload, callback) => {
  Student.findById(id)
    .then((student) => {
      if (!student) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return student.updateAttributes(payload)
        .then((result) => { callback(null, result); });
    })
    .catch(error => callback(error));
};

exports.deleteStudent = (id, callback) => {
  Student.findById(id)
    .then((student) => {
      if (!student) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return student.destroy({ where: { id } })
        .then((result) => {
          if (!result) return callback(Error.internalError.failedToDelete(MODEL_NAME));
          return callback(null, Response.successDelete(MODEL_NAME));
        });
    })
    .catch(error => callback(error));
};
