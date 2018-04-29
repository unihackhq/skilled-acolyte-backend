const Joi = require('joi');

const service = require('../services/StudentService');
const validator = require('../validators').Student;

// [GET] /student_directory
exports.directory = {
  handler: async () => {
    return service.directory();
  },
};

// [GET] /students
exports.list = {
  handler: async () => {
    return service.list();
  },
};

// [GET] /students/{id}
exports.get = {
  handler: async (req) => {
    const { id } = req.params;
    return service.get(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [POST] /students
exports.create = {
  handler: async (req) => {
    const { payload } = req;
    return service.create(payload);
  },
  validate: {
    payload: validator.payload(true),
  },
};

// [PUT] /students/{id}
exports.update = {
  handler: async (req) => {
    const { id } = req.params;
    const { payload } = req;
    return service.update(id, payload);
  },
  validate: {
    payload: validator.payload(false),
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [DELETE] /students/{id}
exports.delete = {
  handler: async (req) => {
    const { id } = req.params;
    return service.delete(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [GET] /students/{id}/teams
exports.teams = {
  handler: async (req) => {
    const { id } = req.params;
    return service.teams(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};

// [POST] /students/{id}/teams
exports.join = {
  handler: (req, res) => {
    const { teamId } = req.payload;
    const { id } = req.params;
    return service.join(teamId, id);
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

// [GET] /students/{id}/invites
exports.invites = {
  handler: async (req) => {
    const { id } = req.params;
    return service.invites(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
};
