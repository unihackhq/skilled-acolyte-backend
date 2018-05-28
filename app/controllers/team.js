const Joi = require('joi');

const { team: stripTeam } = require('../util/strip');
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
    const { type } = req.auth.credentials;
    const { id } = req.params;
    const team = await service.get(id);

    if (type === 'admin') {
      return team;
    }
    return stripTeam(team);
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
    const { type, id } = req.auth.credentials;
    const { addMembers, ...payload } = req.payload;
    // add student's own id
    if (type === 'student') {
      addMembers.push(id);
    }

    let team;
    // create and add members
    if (addMembers.length > 0) {
      const { id: teamId } = await service.createAndJoin(addMembers, payload);

      // return team detail with members in proper format
      team = await service.get(teamId);
    } else {
      team = await service.create(payload);
    }

    // maybe strip data
    if (type === 'admin') {
      return team;
    }
    return stripTeam(team);
  },
  validate: {
    payload: {
      addMembers: Joi.array().items(Joi.string().guid({ version: 'uuidv4' })).default([]),
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
