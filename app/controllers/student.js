const Joi = require('joi');

const strip = require('../util/strip');
const service = require('../services/student');
const validator = require('../validators/student');
const ticketValidator = require('../validators/ticket');
const constant = require('../constants');

// [GET] /students
exports.list = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;

    const list = await service.list();
    return list.map(student => strip.student(student, scope));
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [GET] /students/{id}
exports.get = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;

    const student = await service.get(id);
    return strip.student(student, scope);
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
    const { scope } = req.auth.credentials;
    const { payload } = req;

    const student = await service.create(payload);
    return strip.student(student, scope);
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
    const { scope } = req.auth.credentials;
    const { id } = req.params;
    const { payload } = req;

    const student = await service.update(id, payload);
    return strip.student(student, scope);
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
    const { scope } = req.auth.credentials;
    const { id } = req.params;

    const tickets = await service.tickets(id);
    return tickets.map(ticket => strip.ticket(ticket, scope));
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
    const { scope } = req.auth.credentials;
    const { id } = req.params;
    const { payload } = req;

    const ticket = await service.addTicket(id, payload);
    return strip.ticket(ticket, scope);
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
    const { scope } = req.auth.credentials;
    const { id } = req.params;
    const events = await service.events(id);

    events.map(event => strip.event(event, scope));
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
    const { scope } = req.auth.credentials;
    const { id } = req.params;

    const teams = await service.teams(id);
    return teams.map(team => strip.team(team, scope));
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
    const { scope } = req.auth.credentials;
    const { id } = req.params;

    const teams = await service.invites(id);
    return teams.map(team => strip.team(team, scope));
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
