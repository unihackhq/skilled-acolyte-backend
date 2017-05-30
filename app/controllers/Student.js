const Joi = require('joi');

const Student = require('../models').Student;
const validators = require('../validators');
const responses = require('../responses');

// [GET] /student
exports.getAllStudents = {
  handler: (req, res) => {
    Student.findAll()
      .then((result) => {
        res({
          status: 'Success',
          data: result,
        });
      });
  },
};

// [GET] /student/{id}
exports.getStudentById = {
  handler: (req, res) => {
    const id = req.params.id;

    Student.findById(id)
      .then((result) => {
        if (!result) {
          return res(responses.notFound('student'));
        }
        return res(result);
      });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};

// [POST] /student
exports.createStudent = {
  handler: (req, res) => {
    const payload = req.payload;
    return Student.create(payload)
      .then((result) => { res(result); })
      .catch(() => { res(responses.internalError('create', 'Student')); });
  },
  validate: {
    payload: validators.Student.payload,
  },
};

// [PUT] /Student/{id}
exports.updateStudentById = {
  handler: (req, res) => {
    const id = req.params.id;
    const payload = req.payload;

    Student.findById(id)
      .then((student) => {
        if (!student) {
          return res(responses.notFound('student'));
        }

        return student.updateAttributes(payload)
          .then((result) => { res(result); });
      });
  },
  validate: {
    payload: validators.Student.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};

// [DELETE] /student/{id}
exports.deleteStudentById = {
  handler: (req, res) => {
    const id = req.params.id;

    Student.findById(id)
      .then((student) => {
        if (!student) {
          return res(responses.notFound('student'));
        }

        return student.destroy({
          where: { id },
        }).then((result) => {
          if (!result) {
            return res(responses.internalError('delete', 'student'));
          }

          return res(responses.successDelete('student'));
        });
      });
  },
  validate: {
    payload: validators.Student.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).error(new Error('Not a valid id')),
    },
  },
};
