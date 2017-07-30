const Joi = require('joi');

const StudentService = require('../services/StudentService');
const SkilledError = require('../errors');
const validators = require('../validators');

// [GET] /student
exports.getAllStudents = {
  handler: (req, res) => {
    StudentService.listAll((err, results) => {
      if (err) return res(SkilledError.handler(err));
      return res({ status: 'Success', results });
    });
  },
};

// [GET] /student/{id}
exports.getStudentById = {
  handler: (req, res) => {
    const id = req.params.id;
    StudentService.getStudent(id, (err, result) => {
      if (err) return res(SkilledError.handler(err));
      return res({ result });
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
    StudentService.createStudent(payload, (err, result) => {
      if (err) return res(SkilledError.handler(err));
      return res(result);
    });
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

    StudentService.updateStudent(id, payload, (err, result) => {
      if (err) return res(SkilledError.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: validators.Student.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};
