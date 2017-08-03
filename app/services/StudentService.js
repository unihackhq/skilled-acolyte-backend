/* eslint no-param-reassign: ["error", { "props": false }] */

const Student = require('../models').Student;
const User = require('../models').User;
const Error = require('../errors');
const uuidv4 = require('uuid/v4');

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
  Student.findById(id)
    .then((result) => {
      if (!result) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return callback(null, result);
    })
    .catch(error => callback(error));
};

exports.createStudent = (data, callback) => {
  // assign IDs manually
  data.id = uuidv4();
  data.user.id = data.id;

  Student.create(data, { include: [{ model: User, as: 'user' }] })
    .then((result) => {
      callback(null, result);
    })
    .catch((error) => {
      callback(error);
    });
};

exports.bulkCreateStudent = (students, callback) => {
  const resultPromise = students.map((student) => {
    // assign IDs manually
    student.id = uuidv4();
    student.user.id = student.id;

    return new Promise((resolve, reject) => {
      exports.createStudent(student, (error, result) => {
        if (error) {
          callback(error);
          reject();
        }
        return resolve(result);
      });
    });
  });

  Promise.all(resultPromise)
    .then((result) => {
      callback(null, result);
    });
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
          if (!result) return callback(Error.invalid.failedToDelete(MODEL_NAME));
          return callback(null, {
            status: 'SUCCESS',
            message: `Successfully deleted ${MODEL_NAME}`,
          });
        });
    })
    .catch(error => callback(error));
};

exports.getStudentDirectory = (callback) => {
  Student.findAll({ include: [{ model: User }] })
    .then((result) => {
      callback(null, result);
    })
    .catch(error => callback(error));
};

exports.getStudentTeams = (id, callback) => {
  Student.findById(id)
    .then((student) => {
      if (!student) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return student.getTeams({ joinTableAttributes: ['invited'] })
        .then((results) => {
          return callback(null, results);
        });
    })
    .catch(error => callback(error));
};

exports.getStudentInvites = (id, callback) => {
  Student.findById(id)
    .then((student) => {
      if (!student) return callback(Error.notFound.modelNotFound(MODEL_NAME));
      return student.getInvites({ joinTableAttributes: ['invited'] })
        .then((results) => {
          return callback(null, results);
        });
    })
    .catch(error => callback(error));
};
