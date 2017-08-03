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
  const CreateUserPromise = (payload) => {
    let id;
    const userId = payload.id;
    const userObj = payload.user;

    return new Promise((resolve, reject) => {
      if (userId) {
        console.log('Identified User ID, bypassing CreateUserPromise');
        id = userId;
        return resolve({ id, payload });
      }
      return User.create(userObj)
        .then((result) => {
          const user = result.get({ plain: true });
          id = user.id;
          return resolve({ id, payload, user });
        })
        .catch(() => {
          return reject(Error.invalid.failedToCreate('user (through student)'));
        });
    });
  };

  const CreateStudentPromise = ({ id, payload, user }) => {
    return new Promise((resolve, reject) => {
      payload.id = id;
      return Student.create(payload)
        .then((result) => {
          const student = result.get({ plain: true });
          if (user) {
            student.user = user;
          }
          return resolve(student);
        })
        .catch(() => {
          return reject(Error.invalid.failedToCreate(MODEL_NAME));
        });
    });
  };

  CreateUserPromise(data)
    .then(CreateStudentPromise)
    .then((result) => {
      callback(null, result);
    })
    .catch((error) => {
      callback(error);
    });
};

exports.bulkCreateStudent = (students, callback) => {
  const resultPromise = students.map((student) => {
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
