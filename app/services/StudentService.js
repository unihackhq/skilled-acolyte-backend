/* eslint no-param-reassign: ["error", { "props": false }] */

const Student = require('../models').Student;
const User = require('../models').User;
const Error = require('../errors');

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
  const CreateUserPromise = ({ id, payload, student }) => {
    return new Promise((resolve, reject) => {
      const userObj = payload.user;
      userObj.id = id;

      return User.create(userObj)
        .then((result) => {
          const response = Object.assign(student, { user: result.get({ plain: true }) });
          return resolve(response);
        })
        .catch((err) => {
          console.log(err);
          return reject(Error.invalid.failedToCreate('user (through student)'));
        });
    });
  };

  const CreateStudentPromise = (payload) => {
    return new Promise((resolve, reject) => {
      return Student.create(payload)
        .then((result) => {
          const id = result.id;
          return resolve({ id, payload, student: result.get({ plain: true }) });
        })
        .catch((err) => {
          console.log(err);
          return reject(Error.invalid.failedToCreate(MODEL_NAME));
        });
    });
  };

  CreateStudentPromise(data)
    .then(CreateUserPromise)
    .then((result) => {
      callback(null, result);
    })
    .catch((error) => {
      callback(error);
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
