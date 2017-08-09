const Joi = require('joi');

const StudentService = require('../services/StudentService');
const Errors = require('../errors');
const validators = require('../validators');

// [GET] /student_directory
exports.getStudentDirectory = {
  handler: (req, res) => {
    StudentService.getStudentDirectory((err, results) => {
      if (err) return res(Errors.handler(err));
      return res({ status: 'Success', results });
    });
  },
};

// [GET] /student
exports.getAllStudents = {
  handler: (req, res) => {
    StudentService.listAll((err, results) => {
      if (err) return res(Errors.handler(err));
      return res({ status: 'Success', results });
    });
  },
};

// [GET] /student/{id}
exports.getStudentById = {
  handler: (req, res) => {
    const id = req.params.id;
    StudentService.getStudent(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [POST] /student
exports.createStudent = {
  handler: (req, res) => {
    const payload = req.payload;
    StudentService.createStudent(payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: validators.Student.payload(true),
  },
};

// [PUT] /Student/{id}
exports.updateStudentById = {
  handler: (req, res) => {
    const id = req.params.id;
    const payload = req.payload;

    StudentService.updateStudent(id, payload, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    payload: validators.Student.payload(false),
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [GET] /student/{id}/teams
exports.getStudentTeamsById = {
  handler: (req, res) => {
    const id = req.params.id;
    StudentService.getStudentTeams(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [POST] /student/{id}/teams
exports.assignTeam = {
  handler: (req, res) => {
    const teamId = req.payload.teamId;
    const userId = req.params.id;

    StudentService.joinTeam(teamId, userId, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
    payload: {
      teamId: Joi.string().guid({ version: 'uuidv4' }).required(),
    }
  },
};

// [GET] /student/{id}/invites
exports.getStudentInvitesById = {
  handler: (req, res) => {
    const id = req.params.id;
    StudentService.getStudentInvites(id, (err, result) => {
      if (err) return res(Errors.handler(err));
      return res(result);
    });
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};
