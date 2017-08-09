/* eslint no-param-reassign: ["error", { "props": false }] */

const Student = require('../models').Student;
const User = require('../models').User;
const Team = require('../models').Team;
const Errors = require('../errors');

const MODEL_NAME = 'student';

exports.listAll = (callback) => {
  Student.findAll()
    .then(result => callback(null, result))
    .catch(error => callback(error));
};

exports.getStudent = (id, callback) => {
  Student.findById(id)
    .then((result) => {
      if (!result) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
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
          return reject(Errors.invalid.failedToCreate('user (through student)'));
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
          return reject(Errors.invalid.failedToCreate(MODEL_NAME));
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
          return reject();
        }
        return resolve(result);
      });
    });
  });

  Promise.all(resultPromise)
    .then((result) => {
      callback(null, result);
    })
    .catch(() => {
      return callback(Errors.invalid.failedToCreate(MODEL_NAME));
    });
};


exports.updateStudent = (id, payload, callback) => {
  Student.findById(id)
    .then((student) => {
      if (!student) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return student.updateAttributes(payload)
        .then((result) => { callback(null, result); });
    })
    .catch(error => callback(error));
};

exports.deleteStudent = (id, callback) => {
  Student.findById(id)
    .then((student) => {
      if (!student) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return student.destroy({ where: { id } })
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

exports.getStudentDirectory = (callback) => {
  Student.findAll({ include: [{ model: User, as: 'user' }] })
    .then((result) => {
      callback(null, result);
    })
    .catch(error => callback(error));
};

exports.getStudentTeams = (id, callback) => {
  Student.findById(id)
    .then((student) => {
      if (!student) return callback(Errors.notFound.modelNotFound(MODEL_NAME));
      return student.getTeams({ joinTableAttributes: ['invited'] })
        .then((results) => {
          return callback(null, results);
        });
    })
    .catch(error => callback(error));
};

const assignTeam = (team, studentId, callback) => {
  return team.addMembers(studentId, { invited: false })
    .then((results) => {
      if (results.length === 0) {
        return callback(Errors.invalid.alreadyMember());
      }

      const result = results[0][0];
      return callback(null, result);
    })
    .catch(() => {
      return callback(Errors.invalid.failedToCreate('member'));
    });
};

exports.joinTeam = (teamId, studentId, callback) => {
  Team.findById(teamId)
    .then((team) => {
      if (!team) return callback(Errors.notFound.modelNotFound('team'));
      return team.hasInvited(studentId)
        .then((isInvited) => {
          if (isInvited) {
            team.removeInvited(studentId).then(() => {
              assignTeam(team, studentId, callback);
            });
          }
          assignTeam(team, studentId, callback);
        });
    });
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
