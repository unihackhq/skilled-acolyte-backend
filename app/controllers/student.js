const Joi = require('joi');

const { event: stripEvent, team: stripTeam } = require('../util/strip');
const service = require('../services/student');
const validator = require('../validators/student');
const ticketValidator = require('../validators/ticket');
const constant = require('../constants');

// [GET] /students
exports.list = {
  handler: async () => {
    const students = await service.list();
    return students;
  },
  auth: {
    scope: [constant.adminScope],
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
  auth: {
    scope: [constant.adminScope, `${constant.userScope}-{params.id}`],
  },
};

// [POST] /students
exports.create = {
  handler: async (req) => {
    const { payload } = req;
    return service.create(payload);
  },
  validate: {
    payload: validator.requiredPayload,
  },
  auth: {
    scope: [constant.adminScope],
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
    payload: validator.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.userScope}-{params.id}`],
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
  auth: {
    scope: [constant.adminScope],
  },
};

// [GET] /students/{id}/tickets
exports.tickets = {
  handler: async (req) => {
    const { id } = req.params;
    return service.tickets(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.userScope}-{params.id}`],
  },
};

// [POST] /students/{id}/tickets
exports.addTicket = {
  handler: async (req) => {
    const { id } = req.params;
    const { payload } = req;

    return service.addTicket(id, payload);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
    payload: ticketValidator.requiredPayload,
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [GET] /students/{id}/events
exports.events = {
  handler: async (req) => {
    const { type } = req.auth.credentials;
    const { id } = req.params;
    const events = await service.events(id);

    if (type === constant.adminType) {
      return events;
    }
    return events.map(stripEvent);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.userScope}-{params.id}`],
  },
};

// [GET] /students/{id}/teams
exports.teams = {
  handler: async (req) => {
    const { id } = req.params;
    const { type } = req.auth.credentials;
    const teams = await service.teams(id);

    if (type === constant.adminType) {
      return teams;
    }
    return teams.map(team => stripTeam(team));
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.userScope}-{params.id}`],
  },
};

// [POST] /students/{studentId}/teams/{teamId}/leave
exports.leaveTeam = {
  handler: async (req) => {
    const { studentId, teamId } = req.params;
    return service.leaveTeam(studentId, teamId);
  },
  validate: {
    params: {
      studentId: Joi.string().guid({ version: 'uuidv4' }),
      teamId: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.userScope}-{params.studentId}`],
  },
};

// [GET] /students/{id}/invites
exports.invites = {
  handler: async (req) => {
    const { id } = req.params;
    const { type } = req.auth.credentials;
    const teams = await service.invites(id);

    if (type === constant.adminType) {
      return teams;
    }
    return teams.map(team => stripTeam(team));
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.userScope}-{params.id}`],
  },
};

// [POST] /students/{studentId}/invites/{teamId}/accept
exports.acceptInvite = {
  handler: async (req) => {
    const { studentId, teamId } = req.params;
    return service.acceptInvite(studentId, teamId);
  },
  validate: {
    params: {
      studentId: Joi.string().guid({ version: 'uuidv4' }),
      teamId: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.userScope}-{params.studentId}`],
  },
};

// [POST] /students/{studentId}/invites/{teamId}/reject
exports.rejectInvite = {
  handler: async (req) => {
    const { studentId, teamId } = req.params;
    return service.rejectInvite(studentId, teamId);
  },
  validate: {
    params: {
      studentId: Joi.string().guid({ version: 'uuidv4' }),
      teamId: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.userScope}-{params.studentId}`],
  },
};
