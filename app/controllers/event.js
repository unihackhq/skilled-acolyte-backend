const Joi = require('joi');

const strip = require('../util/strip');
const service = require('../services/event');
const validator = require('../validators/event');
const constant = require('../constants');

// [GET] /events
exports.list = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;

    const list = await service.list();
    return list.map(event => strip.event(event, scope));
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [GET] /events/{id}
exports.get = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;

    const event = await service.get(id);
    return strip.event(event, scope);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.eventScope}-{params.id}`],
  },
};

// [POST] /events
exports.create = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { payload } = req;

    const event = await service.create(payload);
    return strip.event(event, scope);
  },
  validate: {
    payload: validator.requiredPayload,
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [PUT] /events/{id}
exports.update = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;
    const { payload } = req;

    const event = await service.update(id, payload);
    return strip.event(event, scope);
  },
  validate: {
    payload: validator.payload,
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope],
  },
};

// [DELETE] /events/{id}
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

// [GET] /events/{id}/attendees
exports.attendees = {
  handler: async (req) => {
    const { scope } = req.auth.credentials;
    const { id } = req.params;

    const students = await service.attendees(id);
    return students.map(student => strip.student(student, scope));
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.eventScope}-{params.id}`],
  },
};

// [GET] /events/{id}/schedule
exports.schedule = {
  handler: async (req) => {
    const { id } = req.params;
    return service.schedule(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: [constant.adminScope, `${constant.eventScope}-{params.id}`],
  },
};
