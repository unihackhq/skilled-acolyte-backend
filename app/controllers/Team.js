const Joi = require('joi');

const service = require('../services/TeamService');
const validator = require('../validators').Team;

// [GET] /teams
exports.list = {
  handler: async () => {
    return service.list();
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
};

// [POST] /teams
exports.create = {
  handler: async (req) => {
    const { addMe, ...payload } = req.payload;
    if (addMe) {
      return service.create(req.auth.credentials.userId, payload);
    } else {
      return service.onlyCreate(payload);
    }
  },
  validate: {
    payload: {
      addMe: Joi.boolean().default(false),
      ...validator.payload(true),
    }
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
    payload: validator.payload(false),
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
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
};
