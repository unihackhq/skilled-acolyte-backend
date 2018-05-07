const Joi = require('joi');

const service = require('../services/team');
const validator = require('../validators/team');

// [GET] /teams
exports.list = {
  handler: async () => {
    return service.list();
  },
  auth: {
    scope: ['admin'],
  },
};

// [GET] /teams/{id}
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
    scope: ['admin', 'team-{params.id}'],
  },
};

// [POST] /teams
exports.create = {
  handler: async (req) => {
    const { addMe, ...payload } = req.payload;
    if (addMe) {
      return service.create(req.auth.credentials.userId, payload);
    }
    return service.onlyCreate(payload);
  },
  validate: {
    payload: {
      addMe: Joi.boolean().default(false),
      ...validator.requiredPayload,
    }
  },
  auth: {
    scope: ['admin', 'student'],
  },
};

// [PUT] /teams/{id}
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
    scope: ['admin', 'team-{params.id}'],
  },
};

// [DELETE] /teams/{id}
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
    scope: ['admin'],
  },
};

// [GET] /teams/{id}/members
exports.members = {
  handler: async (req) => {
    const { id } = req.params;
    return service.members(id);
  },
  validate: {
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: ['admin', 'team-{params.id}'],
  },
};

// [GET] /teams/{id}/invites
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
  auth: {
    scope: ['admin', 'team-{params.id}'],
  },
};

// [POST] /teams/{id}/invites
exports.invite = {
  handler: (req) => {
    const { id } = req.params;
    const { userId } = req.payload;
    return service.invite(id, userId);
  },
  validate: {
    payload: {
      userId: Joi.string().guid({ version: 'uuidv4' }).required(),
    },
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  },
  auth: {
    scope: ['admin', 'team-{params.id}'],
  },
};
